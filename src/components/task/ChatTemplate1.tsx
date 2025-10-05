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
  const [input, setInput] = useState('');
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Initialize conversation
  useEffect(() => {
    const initConversation = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      // Check if conversation already exists
      const { data: existingConv } = await supabase
        .from('conversations')
        .select('id, title')
        .eq('task_id', taskId)
        .eq('user_id', user?.id || null)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (existingConv) {
        setConversationId(existingConv.id);
        return;
      }

      // Create new conversation
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
    };

    initConversation();
  }, [taskId]);

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
    if (!input.trim() && selectedImages.length === 0) {
      toast({ title: "提示", description: "请输入内容或上传图片", variant: "destructive" });
      return;
    }
    if (!conversationId) return;

    setIsLoading(true);

    try {
      // Upload images first
      const imageUrls = await uploadImages();

      // Get existing messages for context
      const { data: existingMessages } = await supabase
        .from('messages')
        .select('role, content')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

      // Save user message first
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
      const allMessages = [
        ...(existingMessages || []),
        { role: 'user' as const, content: input }
      ];

      // Call LLM via edge function
      const { error } = await supabase.functions.invoke('doubao-chat', {
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

      toast({ title: "成功", description: "回答已提交，AI正在生成回复" });
    } catch (error) {
      console.error('Error sending message:', error);
      toast({ title: "错误", description: "发送失败", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Send className="h-5 w-5 text-primary" />
        <h2 className="text-2xl font-semibold text-primary">输入你的想法</h2>
      </div>
      
      <div className="space-y-4">
        {/* Selected images preview */}
        {selectedImages.length > 0 && (
          <div className="flex gap-3 flex-wrap">
            {selectedImages.map((file, idx) => (
              <div key={idx} className="relative group">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`预览 ${idx + 1}`}
                  className="w-24 h-24 object-cover rounded-lg border-2 border-border"
                />
                <button
                  onClick={() => removeImage(idx)}
                  className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  type="button"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Input area */}
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="在这里输入你的想法和问题，AI会帮你解答..."
          className="min-h-[120px] resize-none"
          disabled={isLoading}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
        />

        {/* Actions */}
        <div className="flex gap-2 justify-end">
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
            disabled={isLoading}
          />
          <Button
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            disabled={isLoading}
          >
            <Upload className="h-4 w-4 mr-2" />
            上传图片
          </Button>
          <Button
            onClick={handleSendMessage}
            disabled={isLoading || (!input.trim() && selectedImages.length === 0)}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                发送中...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                发送消息
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};