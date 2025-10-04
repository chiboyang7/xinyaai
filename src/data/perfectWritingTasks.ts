export interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
  estimatedTime: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  completed?: boolean;
}

export const perfectWritingTasks: Task[] = [
  {
    id: "1",
    title: "文章主题分析",
    description: "分析文章的核心主题和目标读者",
    category: "写作分析",
    estimatedTime: "15分钟",
    difficulty: "beginner",
  },
  {
    id: "2",
    title: "任务2标题",
    description: "任务2描述",
    category: "分类",
    estimatedTime: "20分钟",
    difficulty: "intermediate",
  },
  {
    id: "3",
    title: "任务3标题",
    description: "任务3描述",
    category: "分类",
    estimatedTime: "20分钟",
    difficulty: "intermediate",
  },
  {
    id: "4",
    title: "任务4标题",
    description: "任务4描述",
    category: "分类",
    estimatedTime: "20分钟",
    difficulty: "advanced",
  },
  {
    id: "5",
    title: "任务5标题",
    description: "任务5描述",
    category: "分类",
    estimatedTime: "20分钟",
    difficulty: "intermediate",
  },
  {
    id: "6",
    title: "任务6标题",
    description: "任务6描述",
    category: "分类",
    estimatedTime: "20分钟",
    difficulty: "advanced",
  },
];
