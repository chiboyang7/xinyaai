import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Upload, Send } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  image_urls?: string[];
  created_at: string;
}

interface ChatTemplate1Props {
  taskId: string;
}

export const ChatTemplate1: React.FC<ChatTemplate1Props> = ({ taskId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Initialize conversation
  useEffect(() => {
    const initConversation = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { data, error } = await supabase
        .from('conversations')
        .insert({
          user_id: user?.id,
          task_id: taskId,
          title: `Task ${taskId} Chat`
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating conversation:', error);
        toast({ title: "错误", description: "无法创建对话", variant: "destructive" });
        return;
      }

      setConversationId(data.id);
      loadMessages(data.id);
    };

    initConversation();
  }, [taskId]);

  // Load messages
  const loadMessages = async (convId: string) => {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', convId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error loading messages:', error);
      return;
    }

    setMessages((data || []) as Message[]);
  };

  // Subscribe to realtime updates
  useEffect(() => {
    if (!conversationId) return;

    const channel = supabase
      .channel('messages-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${conversationId}`
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as Message]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle image upload
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedImages(Array.from(e.target.files));
    }
  };

  // Upload images to storage
  const uploadImages = async (): Promise<string[]> => {
    const uploadedUrls: string[] = [];

    for (const file of selectedImages) {
      const fileName = `${Date.now()}-${file.name}`;
      const { data, error } = await supabase.storage
        .from('chat-images')
        .upload(fileName, file);

      if (error) {
        console.error('Error uploading image:', error);
        continue;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('chat-images')
        .getPublicUrl(fileName);

      uploadedUrls.push(publicUrl);
    }

    return uploadedUrls;
  };

  // Send message
  const handleSendMessage = async () => {
    if (!input.trim() && selectedImages.length === 0) return;
    if (!conversationId) return;

    setIsLoading(true);

    try {
      // Upload images first
      const imageUrls = await uploadImages();

      // Save user message
      const { error: insertError } = await supabase
        .from('messages')
        .insert({
          conversation_id: conversationId,
          role: 'user',
          content: input,
          image_urls: imageUrls
        });

      if (insertError) throw insertError;

      // Prepare messages for LLM
      const allMessages = [...messages, {
        role: 'user',
        content: input
      }].map(m => ({
        role: m.role,
        content: m.content
      }));

      // Call LLM via edge function
      const { data, error } = await supabase.functions.invoke('doubao-chat', {
        body: {
          conversationId,
          messages: allMessages
        }
      });

      if (error) throw error;

      // Clear input
      setInput('');
      setSelectedImages([]);
      if (fileInputRef.current) fileInputRef.current.value = '';

      toast({ title: "成功", description: "消息已发送" });
    } catch (error) {
      console.error('Error sending message:', error);
      toast({ title: "错误", description: "发送消息失败", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <div className="flex flex-col gap-4">
          {/* Messages */}
          <div className="h-96 overflow-y-auto space-y-4 p-4 border rounded-lg">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  {message.image_urls && message.image_urls.length > 0 && (
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      {message.image_urls.map((url, idx) => (
                        <img key={idx} src={url} alt="" className="rounded" />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Selected images preview */}
          {selectedImages.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {selectedImages.map((file, idx) => (
                <div key={idx} className="relative">
                  <img
                    src={URL.createObjectURL(file)}
                    alt=""
                    className="w-20 h-20 object-cover rounded"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="flex gap-2">
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading}
            >
              <Upload className="h-4 w-4" />
            </Button>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="输入消息..."
              className="flex-1"
              rows={2}
              disabled={isLoading}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <Button
              onClick={handleSendMessage}
              disabled={isLoading || (!input.trim() && selectedImages.length === 0)}
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};