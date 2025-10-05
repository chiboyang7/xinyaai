import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Send } from 'lucide-react';

interface ChatTemplate3Props {
  taskId: string;
}

export const ChatTemplate3: React.FC<ChatTemplate3Props> = ({ taskId }) => {
  const [input, setInput] = useState('');
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  // Save note
  const handleSaveNote = async () => {
    if (!input.trim()) {
      toast({ title: "提示", description: "请输入内容", variant: "destructive" });
      return;
    }
    if (!conversationId) return;

    setIsSubmitting(true);

    try {
      // Save user note
      const { error: insertError } = await supabase
        .from('messages')
        .insert({
          conversation_id: conversationId,
          role: 'user',
          content: input
        });

      if (insertError) throw insertError;

      // Clear input
      setInput('');

      toast({ title: "成功", description: "回答已保存" });
    } catch (error) {
      console.error('Error saving note:', error);
      toast({ title: "错误", description: "保存失败", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Send className="h-5 w-5 text-primary" />
        <h2 className="text-2xl font-semibold text-primary">输入你的想法</h2>
      </div>
      
      <div className="space-y-4">
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
        <div className="flex justify-end">
          <Button
            onClick={handleSaveNote}
            disabled={isSubmitting || !input.trim()}
          >
            {isSubmitting ? '提交中...' : '提交回答'}
          </Button>
        </div>
      </div>
    </div>
  );
};
