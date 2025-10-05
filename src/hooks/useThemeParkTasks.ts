import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { themeParkTasks, Task } from "@/data/themeParkTasks";

export const useThemeParkTasks = () => {
  return useQuery({
    queryKey: ["theme-park-tasks"],
    queryFn: async () => {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      // Get all conversations with user messages (role='user') to determine completion
      const { data: conversations } = await supabase
        .from('conversations')
        .select(`
          task_id,
          messages!inner(role)
        `)
        .eq('user_id', user?.id || null)
        .eq('messages.role', 'user');

      // Build set of completed task IDs (tasks with at least one user message)
      const completedTaskIds = new Set<string>(
        conversations?.map(conv => conv.task_id) || []
      );

      // Update tasks with completion status
      const tasksWithCompletion = themeParkTasks.map(task => ({
        ...task,
        completed: completedTaskIds.has(task.id)
      }));

      return {
        tasks: tasksWithCompletion,
        completedCount: completedTaskIds.size
      };
    },
    staleTime: 30000, // Cache for 30 seconds
    gcTime: 5 * 60 * 1000, // Keep in cache for 5 minutes
  });
};
