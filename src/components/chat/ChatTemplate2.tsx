import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Upload, Send } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  image_urls?: string[];
  created_at: string;
}

interface ChatTemplate2Props {
  taskId: string;
}

export const ChatTemplate2: React.FC<ChatTemplate2Props> = ({ taskId }) => {
  const [input, setInput] = useState('');
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Initialize conversation
  useEffect(() => {
    const initConversation = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      // Check if conversation already exists
      const { data: existingConv } = await supabase
        .from('conversations')
        .select('id')
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
          title: `Task ${taskId} Notes`
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating conversation:', error);
        toast({ title: "错误", description: "无法创建笔记", variant: "destructive" });
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

  // Save note
  const handleSaveNote = async () => {
    if (!input.trim() && selectedImages.length === 0) {
      toast({ title: "提示", description: "请输入内容或上传图片", variant: "destructive" });
      return;
    }
    if (!conversationId) return;

    setIsSubmitting(true);

    try {
      // Upload images first
      const imageUrls = await uploadImages();

      // Save user note
      const { error: insertError } = await supabase
        .from('messages')
        .insert({
          conversation_id: conversationId,
          role: 'user',
          content: input,
          image_urls: imageUrls
        });

      if (insertError) throw insertError;

      // Clear input
      setInput('');
      setSelectedImages([]);
      if (fileInputRef.current) fileInputRef.current.value = '';

      toast({ title: "成功", description: "回答已保存" });
    } catch (error) {
      console.error('Error saving note:', error);
      toast({ title: "错误", description: "保存失败", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-primary">输入你的想法</h3>
      
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
          placeholder="在这里输入你的想法和回答..."
          className="min-h-[120px] resize-none"
          disabled={isSubmitting}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSaveNote();
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
            disabled={isSubmitting}
          />
          <Button
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            disabled={isSubmitting}
          >
            <Upload className="h-4 w-4 mr-2" />
            上传图片
          </Button>
          <Button
            onClick={handleSaveNote}
            disabled={isSubmitting || (!input.trim() && selectedImages.length === 0)}
          >
            {isSubmitting ? '提交中...' : '提交回答'}
          </Button>
        </div>
      </div>
    </div>
  );
};