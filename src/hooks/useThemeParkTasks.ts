import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { themeParkTasks, Task } from "@/data/themeParkTasks";

export const useThemeParkTasks = () => {
  return useQuery({
    queryKey: ["theme-park-tasks"],
    queryFn: async () => {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      // Get all conversations with message count in a single query
      const { data: conversations } = await supabase
        .from('conversations')
        .select(`
          task_id,
          messages(count)
        `)
        .eq('user_id', user?.id || null);

      // Build set of completed task IDs (tasks with messages)
      const completedTaskIds = new Set<string>(
        conversations
          ?.filter(conv => conv.messages && conv.messages.length > 0)
          .map(conv => conv.task_id) || []
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
