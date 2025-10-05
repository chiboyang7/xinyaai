export interface TaskStep {
  stepNumber: number;
  stepName: string;
  instruction: string;
  prompt?: string;
  thinking?: string;
  image?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
  estimatedTime: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  completed?: boolean;
  learningObjectives?: string[];
  knowledgePoints?: string[];
  steps?: TaskStep[];
  exampleImage?: string;
}

export const themeParkTasks: Task[] = [
  {
    id: "1",
    title: "设计一个Labubu专属乐园",
    description: "理解传统APP和AI智能体(AI APP)的区别",
    category: "基础知识",
    estimatedTime: "30分钟",
    difficulty: "beginner",
    learningObjectives: [
      "理解传统APP和AI智能体(AI APP)的区别"
    ],
    knowledgePoints: [
      "理解豆包APP和小红书APP的区别",
      "理解什么是集成了AI功能的APP",
      "小红书是一个图书馆，豆包是一个印刷厂"
    ],
    steps: [
      {
        stepNumber: 1,
        stepName: "在小红书搜索：Labubu主题乐园",
        instruction: "我们所有人看到的内容应该是类似的,如果是不一样，那是由于搜索结果的排列顺序不同。",
        //prompt: "请帮我分析Labubu这个IP形象的核心特征，包括外观、性格和故事背景，用简单易懂的方式列出5个最重要的特点",
        thinking: "为什么我们会看到一样或者相似的内容？因为小红书是一个图书馆，里面的内容都是已经做好的。",
        image: "/task-images/labubu-reference.jpg"
      },
      {
        stepNumber: 2,
        stepName: "设计游乐设施",
        instruction: "构思3个以Labubu为主题的游乐设施创意，每个设施要体现Labubu的不同特点",
        prompt: "基于Labubu的特征，请帮我设计3个创意游乐设施，每个设施要有名称、玩法描述和它体现了Labubu的哪个特点",
        thinking: "思考：如何将IP特征转化为实际的游乐体验？不同年龄段的游客需求有何不同？"
      },
      {
        stepNumber: 3,
        stepName: "规划整体布局",
        instruction: "设计乐园的整体布局和氛围，包括入口、核心区域和装饰风格",
        prompt: "请帮我设计一个Labubu主题乐园的整体布局方案，包括入口设计、3-4个主题区域的规划，以及如何营造神秘森林的沉浸式氛围",
        thinking: "思考：如何通过空间布局营造沉浸式体验？游客动线设计的原则是什么？"
      }
    ]
  },
  {
    id: "2",
    title: "认识AI小助手",
    description: "学会和AI说话，了解主题乐园",
    category: "基础技能",
    estimatedTime: "15分钟",
    difficulty: "beginner",
    learningObjectives: ["学会和AI说话，了解主题乐园"],
  },
  {
    id: "3",
    title: "拆解一个大问题",
    description: "学会和AI沟通，把大问题变成小问题",
    category: "基础技能",
    estimatedTime: "30分钟",
    difficulty: "intermediate",
    learningObjectives: ["学会和AI沟通，把大问题变成小问题"],
  },
  {
    id: "4",
    title: "设计我的第一个乐园游乐设施",
    description: "利用想象力创作的第一个乐园作品",
    category: "创作应用",
    estimatedTime: "25分钟",
    difficulty: "intermediate",
    learningObjectives: ["利用想象力创作的第一个乐园作品"],
  },
  {
    id: "5",
    title: "认识谷歌PTFCR框架（上）",
    description: "学会P和T，2个最重要要素",
    category: "基础知识",
    estimatedTime: "20分钟",
    difficulty: "advanced",
    learningObjectives: ["学会P和T，2个最重要要素"],
  },
  {
    id: "6",
    title: "认识谷歌PTFCR框架（下）",
    description: "学会FCR这3个深度思考要素",
    category: "基础知识",
    estimatedTime: "15分钟",
    difficulty: "beginner",
    learningObjectives: ["学会FCR这3个深度思考要素"],
  },
  {
    id: "7",
    title: "谷歌PTFCR进阶练习",
    description: "创作自己第一个完整的主题乐园",
    category: "创作应用",
    estimatedTime: "15分钟",
    difficulty: "beginner",
    learningObjectives: ["创作自己第一个完整的主题乐园"],
  },
  {
    id: "8",
    title: "把魔法图片变成魔法视频",
    description: "将现实中的作品用AI完成升级迭代",
    category: "基础技能",
    estimatedTime: "20分钟",
    difficulty: "intermediate",
    learningObjectives: ["将现实中的作品用AI完成升级迭代"],
  },
  {
    id: "9",
    title: "票价策略",
    description: "制定门票价格和优惠政策",
    category: "商业策略",
    estimatedTime: "15分钟",
    difficulty: "intermediate",
    learningObjectives: ["制定门票价格和优惠政策"],
  },
  {
    id: "10",
    title: "营销推广计划",
    description: "设计开业前的营销和宣传策略",
    category: "市场营销",
    estimatedTime: "25分钟",
    difficulty: "intermediate",
    learningObjectives: ["设计开业前的营销和宣传策略"],
  },
  {
    id: "11",
    title: "员工培训方案",
    description: "规划员工招聘和培训计划",
    category: "人力资源",
    estimatedTime: "20分钟",
    difficulty: "intermediate",
    learningObjectives: ["规划员工招聘和培训计划"],
  },
  {
    id: "12",
    title: "科技应用",
    description: "整合VR、AR等现代科技到游乐体验中",
    category: "技术创新",
    estimatedTime: "30分钟",
    difficulty: "advanced",
    learningObjectives: ["整合VR、AR等现代科技到游乐体验中"],
  },
  {
    id: "13",
    title: "无障碍设计",
    description: "确保乐园对所有游客友好和无障碍",
    category: "包容性设计",
    estimatedTime: "20分钟",
    difficulty: "intermediate",
    learningObjectives: ["确保乐园对所有游客友好和无障碍"],
  },
  {
    id: "14",
    title: "季节性活动策划",
    description: "设计全年的节日和特殊活动",
    category: "活动策划",
    estimatedTime: "25分钟",
    difficulty: "intermediate",
    learningObjectives: ["设计全年的节日和特殊活动"],
  },
  {
    id: "15",
    title: "预算规划",
    description: "制定建设和运营的财务预算",
    category: "财务管理",
    estimatedTime: "30分钟",
    difficulty: "advanced",
    learningObjectives: ["制定建设和运营的财务预算"],
  },
  {
    id: "16",
    title: "游客体验流程",
    description: "设计从入园到离园的完整游客旅程",
    category: "体验设计",
    estimatedTime: "25分钟",
    difficulty: "intermediate",
    learningObjectives: ["设计从入园到离园的完整游客旅程"],
  },
  {
    id: "17",
    title: "品牌形象设计",
    description: "创建乐园的视觉识别系统和吉祥物",
    category: "品牌设计",
    estimatedTime: "30分钟",
    difficulty: "intermediate",
    learningObjectives: ["创建乐园的视觉识别系统和吉祥物"],
  },
  {
    id: "18",
    title: "最终方案展示",
    description: "整合所有元素，制作完整的主题乐园方案展示",
    category: "综合呈现",
    estimatedTime: "40分钟",
    difficulty: "advanced",
    learningObjectives: ["整合所有元素，制作完整的主题乐园方案展示"],
  },
];
