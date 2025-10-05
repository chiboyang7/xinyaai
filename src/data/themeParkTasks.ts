export interface TaskStep {
  stepNumber: number;
  stepName: string;
  instruction: string;
  prompt?: string;
  prompts?: string[];
  thinking?: string;
  image?: string;
  images?: string[];
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
        stepName: "利用豆包设计一个Labubu主题乐园",
        instruction: "我们对小红书上的LLabubu主题乐园不满意，让我们自己设计一个漂亮的Labubu乐园",
        prompt: "请帮我设计一个Labubu主题乐园，有大钻石和金币",
        thinking: "我们3次给豆包一样的提示词，得到的图片为什么是不一样的？因为豆包是一个创作新作品的印刷厂，每次作品都是有不同特点的",
        images: [
          "/task-images/labubu-design-1.png",
          "/task-images/labubu-design-2.png"
        ]
      },
      {
        stepNumber: 3,
        stepName: "理解豆包和小红书的不同",
        instruction: "小红书是一个传统的APP，里面的内容都是别人创作好之后存在数据库中的，因此我们不同的用户可以看到同样的内容,就像我们去图书馆找书，里面的书有什么，我们就能看到什么，比如故事书，动漫和视频光盘。但豆包是一个AI智能体，更像一个作家或者印刷厂，没有存储任何做好的内容，所有的内容都是按照我们的要求新生成的。",
        images: [
          "/task-images/xhs-comparison-new.jpg",
          "/task-images/doubao-comparison-new.jpg"
        ],
        thinking: "我们3次给豆包一样的提示词，为什么豆包不把原来做好的内容发给我呢？这是因为豆包的存储机制中，不会存储之前做好的作品，用户也希望看到不同的作品。"
      }
    ]
  },
  {
    id: "2",
    title: "体验AI的创作能力",
    description: "使用AI强大的创作能力做出几个作品",
    category: "基础技能",
    estimatedTime: "15分钟",
    difficulty: "beginner",
    learningObjectives: ["开始了解AI强大的创作能力"],
    knowledgePoints: [
      "理解AI助手的基本工作原理",
      "掌握与AI进行有效对话的技巧",
      "了解主题乐园的基本构成要素"
    ],
    steps: [
      {
        stepNumber: 1,
        stepName: "创作一个我自己的AI形象",
        instruction: "每个人小时候都梦想做一个英雄或者公主，如果另一个世界有一个你，ta是什么形象呢？",
        prompts: [
          "画一个超级英雄版的我：我是一个10岁的男孩；我最喜欢的颜色是蓝色；我的超能力是飞行和控制闪电；背景是城市上空的星空，卡通风格，像宫崎骏漫画",
          "画一个公主版的我：我是一个10岁的女孩，我最喜欢的颜色是蓝色，我的超能力是让树飞起来和变出宝石，背景是花园，像宫崎骏漫画风格",
         ],
        //thinking: "深度思考的价值是什么？对于简单问题区别不大，但对于复杂问题，深度思考模式回答质量更高。"
      },
      {
        stepNumber: 2,
        stepName: "创建一个未来主题乐园",
        instruction: "我们想用AI做一版主题乐园，发现预算才是乐园的关键",
        prompts: [
          "按照真实的社会物价和成本，请帮我设计一个迪士尼乐园，预算100万元",
          "按照真实的社会物价和成本，请帮我设计一个迪士尼乐园，预算100亿元",
        ],
        thinking: "每个主题乐园都有什么独特之处？"
      },
      {
        stepNumber: 3,
        stepName: "创建一个贫穷版的未来主题乐园",
        instruction: "让我们挑战用1元和100元能做成什么样的乐园",
        prompts: [
          "按照真实的社会物价和成本，请帮我设计一个迪士尼乐园，预算100元",
          "按照真实的社会物价和成本，请帮我设计一个迪士尼乐园，预算1元",
        ],
        thinking: "让AI发挥更大的潜力，变得更好玩，需要你的创意：设计一个预算100元的火影忍者乐园？和身边的朋友比较一下看谁做的更有趣"
      }
      {
        stepNumber: 4,
        stepName: "让图片动起来，变成视频",
        instruction: "选一张你最喜欢的乐园图片，把他变成一个视频",
        prompts: [
          "变成视频",
          "一只飞龙在天上向这个乐园喷火",
          "两只罗小黑在乐园战斗",
        ],
        thinking: "AI能做很多事情，但AI不是万能的，AI也会做错"
      }
    ]
  },
  {
    id: "3",
    title: "拆解一个大问题",
    description: "学会和AI沟通，把大问题变成小问题",
    category: "基础技能",
    estimatedTime: "30分钟",
    difficulty: "intermediate",
    learningObjectives: ["学会和AI进行一步步的沟通"],
    knowledgePoints: [
      
      "掌握将复杂问题分解为简单步骤的方法",
      "学会循序渐进地与AI协作"
    ],
    steps: [
      {
        stepNumber: 1,
        stepName: "提出大问题",
        instruction: "先向AI提出一个复杂的大问题",
        prompt: "我想建一个主题乐园，应该怎么做？",
        thinking: "AI给出的答案是不是太笼统了？"
      },
      {
        stepNumber: 2,
        stepName: "拆解为小步骤",
        instruction: "将大问题拆解成具体的小问题",
        prompt: "建设主题乐园的第一步是什么？需要考虑哪些因素？",
        thinking: "具体的小问题是不是更容易得到有用的答案？"
      },
      {
        stepNumber: 3,
        stepName: "深入细节",
        instruction: "针对其中一个小问题继续深入",
        prompt: "在选择主题乐园位置时，需要考虑哪些具体条件？每个条件为什么重要？",
        thinking: "一步步深入，是不是能得到更实用的建议？"
      }
    ]
  },
  {
    id: "4",
    title: "设计我的第一个乐园游乐设施",
    description: "利用想象力创作的第一个乐园作品",
    category: "创作应用",
    estimatedTime: "25分钟",
    difficulty: "intermediate",
    learningObjectives: ["利用想象力创作的第一个乐园作品"],
    knowledgePoints: [
      "了解游乐设施的基本类型",
      "掌握创意设施设计的要素",
      "学会用AI辅助创意实现"
    ],
    steps: [
      {
        stepNumber: 1,
        stepName: "选择设施类型",
        instruction: "思考你想设计什么类型的游乐设施",
        prompt: "请介绍5种不同类型的游乐设施，包括过山车、旋转类、水上项目等",
        thinking: "哪种类型的设施最吸引你？为什么？"
      },
      {
        stepNumber: 2,
        stepName: "构思创意概念",
        instruction: "为你的设施想一个独特的主题和故事",
        prompt: "帮我设计一个太空主题的过山车，要有独特的故事背景和视觉效果",
        thinking: "好的主题故事如何让游乐设施更有吸引力？"
      },
      {
        stepNumber: 3,
        stepName: "细化设计方案",
        instruction: "描述设施的具体细节，包括外观、体验过程等",
        thinking: "完整的设计需要考虑哪些方面？安全性、趣味性、故事性？"
      }
    ]
  },
  {
    id: "5",
    title: "认识谷歌PTFCR框架（上）",
    description: "学会P和T，2个最重要要素",
    category: "基础知识",
    estimatedTime: "20分钟",
    difficulty: "advanced",
    learningObjectives: ["学会P和T，2个最重要要素"],
    knowledgePoints: [
      "理解Persona（角色）的定义和作用",
      "掌握Task（任务）的明确表达方式",
      "学会结合角色和任务提升AI回答质量"
    ],
    steps: [
      {
        stepNumber: 1,
        stepName: "理解Persona（角色）",
        instruction: "了解什么是Persona，为什么给AI设定角色很重要",
        prompt: "什么是Persona？为AI设定不同角色会有什么不同的效果？",
        thinking: "同样的问题，不同角色的AI会给出什么不同的答案？"
      },
      {
        stepNumber: 2,
        stepName: "尝试不同角色",
        instruction: "体验给AI设定不同角色带来的变化",
        prompt: "请以一位资深主题乐园设计师的身份，分析迪士尼乐园成功的关键因素",
        thinking: "专业角色是不是能提供更专业的见解？"
      },
      {
        stepNumber: 3,
        stepName: "明确Task（任务）",
        instruction: "学会清晰地描述你希望AI完成的任务",
        prompt: "作为主题乐园设计师，请为我设计一个适合5-12岁儿童的游乐区域，包括3个游乐设施、安全措施和主题装饰",
        thinking: "任务描述越具体，AI的输出是不是越符合需求？"
      }
    ]
  },
  {
    id: "6",
    title: "认识谷歌PTFCR框架（下）",
    description: "学会FCR这3个深度思考要素",
    category: "基础知识",
    estimatedTime: "15分钟",
    difficulty: "beginner",
    learningObjectives: ["学会FCR这3个深度思考要素"],
    knowledgePoints: [
      "理解Format（格式）对输出的影响",
      "掌握Context（上下文）的提供方法",
      "学会使用Reference（参考）提升质量"
    ],
    steps: [
      {
        stepNumber: 1,
        stepName: "Format（格式）",
        instruction: "学会指定AI输出的格式",
        prompt: "请以表格形式对比3个著名主题乐园的特色、目标人群和代表性设施",
        thinking: "指定格式后，信息是不是更容易理解和比较？"
      },
      {
        stepNumber: 2,
        stepName: "Context（上下文）",
        instruction: "提供背景信息让AI更好理解需求",
        prompt: "我正在为一个中等城市设计家庭主题乐园，预算有限，目标客户是本地居民。请建议3个性价比高的核心游乐设施",
        thinking: "提供上下文信息后，AI的建议是不是更贴合实际？"
      },
      {
        stepNumber: 3,
        stepName: "Reference（参考）",
        instruction: "给出参考示例，让AI理解你想要的风格",
        prompt: "参考环球影城的哈利波特园区那种沉浸式体验设计，帮我设计一个西游记主题区域",
        thinking: "有了参考示例，AI是不是更能理解你想要的感觉？"
      }
    ]
  },
  {
    id: "7",
    title: "谷歌PTFCR进阶练习",
    description: "创作自己第一个完整的主题乐园",
    category: "创作应用",
    estimatedTime: "15分钟",
    difficulty: "beginner",
    learningObjectives: ["创作自己第一个完整的主题乐园"],
    knowledgePoints: [
      "综合运用PTFCR框架的所有要素",
      "掌握从概念到细节的完整设计流程",
      "学会系统性地与AI协作完成复杂项目"
    ],
    steps: [
      {
        stepNumber: 1,
        stepName: "应用完整PTFCR",
        instruction: "使用PTFCR框架设计你的主题乐园",
        prompt: "【Persona】作为一位创意主题乐园设计师\n【Task】帮我设计一个完整的海洋探险主题乐园\n【Format】请以分区规划的形式呈现，包括各区域名称、特色设施、餐饮和商店\n【Context】面向家庭游客，占地约50亩，预算中等\n【Reference】参考长隆海洋王国的布局风格",
        thinking: "完整使用PTFCR框架，AI的回答是不是更全面、更专业？"
      },
      {
        stepNumber: 2,
        stepName: "深化设计细节",
        instruction: "选择一个区域，要求AI提供更详细的设计",
        thinking: "如何进一步完善你的主题乐园设计？"
      },
      {
        stepNumber: 3,
        stepName: "生成视觉概念",
        instruction: "让AI帮你生成乐园的视觉设计概念",
        thinking: "图像和文字结合，是不是能更好地展示你的创意？"
      }
    ]
  },
  {
    id: "8",
    title: "把魔法图片变成魔法视频",
    description: "将现实中的作品用AI完成升级迭代",
    category: "基础技能",
    estimatedTime: "20分钟",
    difficulty: "intermediate",
    learningObjectives: ["将现实中的作品用AI完成升级迭代"],
    knowledgePoints: [
      "理解AI图像到视频转换技术",
      "掌握优化视频生成效果的技巧",
      "学会迭代改进创作作品"
    ],
    steps: [
      {
        stepNumber: 1,
        stepName: "准备图片素材",
        instruction: "选择或创作一张你想转换成视频的图片",
        thinking: "什么样的图片更适合转换成动态视频？"
      },
      {
        stepNumber: 2,
        stepName: "图片转视频",
        instruction: "使用AI工具将静态图片转换为动态视频",
        prompt: "将这张主题乐园设计图转换为视频，添加游客走动、设施运转的动态效果",
        thinking: "静态图片变成动态视频后，是不是更有吸引力？"
      },
      {
        stepNumber: 3,
        stepName: "优化和迭代",
        instruction: "根据生成结果，调整参数重新生成",
        thinking: "如何通过多次迭代，让视频效果越来越好？"
      }
    ]
  },
  {
    id: "9",
    title: "票价策略",
    description: "制定门票价格和优惠政策",
    category: "商业策略",
    estimatedTime: "15分钟",
    difficulty: "intermediate",
    learningObjectives: ["制定门票价格和优惠政策"],
    knowledgePoints: [
      "了解主题乐园的定价策略",
      "掌握不同客户群体的票价设计",
      "学会制定有吸引力的优惠政策"
    ],
    steps: [
      {
        stepNumber: 1,
        stepName: "市场调研",
        instruction: "了解同类主题乐园的票价水平",
        prompt: "请分析国内中型主题乐园的票价范围，包括成人票、儿童票和家庭套票",
        thinking: "合理的定价需要参考哪些因素？"
      },
      {
        stepNumber: 2,
        stepName: "设计票种",
        instruction: "为你的主题乐园设计多种票务产品",
        prompt: "帮我设计一套完整的票务体系，包括单日票、年卡、季卡，以及不同人群的优惠票种",
        thinking: "多样化的票种如何满足不同游客的需求？"
      },
      {
        stepNumber: 3,
        stepName: "制定优惠策略",
        instruction: "设计促销和优惠活动方案",
        thinking: "什么样的优惠活动既能吸引游客，又能保证盈利？"
      }
    ]
  },
  {
    id: "10",
    title: "营销推广计划",
    description: "设计开业前的营销和宣传策略",
    category: "市场营销",
    estimatedTime: "25分钟",
    difficulty: "intermediate",
    learningObjectives: ["设计开业前的营销和宣传策略"],
    knowledgePoints: [
      "了解主题乐园的营销渠道",
      "掌握开业前预热的方法",
      "学会设计吸引人的宣传内容"
    ],
    steps: [
      {
        stepNumber: 1,
        stepName: "确定目标受众",
        instruction: "明确你的主题乐园要吸引哪些人群",
        prompt: "帮我分析家庭主题乐园的目标客户群体，包括年龄、兴趣、消费能力等特征",
        thinking: "了解目标客户，才能设计有针对性的营销方案"
      },
      {
        stepNumber: 2,
        stepName: "选择营销渠道",
        instruction: "规划线上线下的宣传渠道",
        prompt: "为新开业的主题乐园设计一套全方位的营销渠道组合，包括社交媒体、短视频平台、本地广告等",
        thinking: "不同渠道如何互相配合，形成营销合力？"
      },
      {
        stepNumber: 3,
        stepName: "创意内容策划",
        instruction: "设计吸引眼球的宣传创意",
        thinking: "什么样的内容能在社交媒体上引发传播？"
      }
    ]
  },
  {
    id: "11",
    title: "员工培训方案",
    description: "规划员工招聘和培训计划",
    category: "人力资源",
    estimatedTime: "20分钟",
    difficulty: "intermediate",
    learningObjectives: ["规划员工招聘和培训计划"],
    knowledgePoints: [
      "了解主题乐园的岗位需求",
      "掌握员工培训的重点内容",
      "学会设计员工服务标准"
    ],
    steps: [
      {
        stepNumber: 1,
        stepName: "确定岗位需求",
        instruction: "列出主题乐园需要的各类员工",
        prompt: "请列出一个中型主题乐园所需的各类员工岗位，包括数量、职责和要求",
        thinking: "一个主题乐园需要哪些不同类型的员工？"
      },
      {
        stepNumber: 2,
        stepName: "设计培训计划",
        instruction: "制定新员工的培训方案",
        prompt: "为主题乐园设计一套完整的新员工培训计划，包括服务礼仪、安全规范、应急处理等内容",
        thinking: "如何通过培训，让员工提供优质服务？"
      },
      {
        stepNumber: 3,
        stepName: "制定服务标准",
        instruction: "建立统一的服务规范和标准",
        thinking: "什么样的服务标准能提升游客满意度？"
      }
    ]
  },
  {
    id: "12",
    title: "科技应用",
    description: "整合VR、AR等现代科技到游乐体验中",
    category: "技术创新",
    estimatedTime: "30分钟",
    difficulty: "advanced",
    learningObjectives: ["整合VR、AR等现代科技到游乐体验中"],
    knowledgePoints: [
      "了解VR、AR等技术在主题乐园的应用",
      "掌握科技与传统游乐设施的结合方式",
      "学会设计科技感十足的互动体验"
    ],
    steps: [
      {
        stepNumber: 1,
        stepName: "了解科技应用",
        instruction: "学习现代科技在主题乐园中的实际应用",
        prompt: "请介绍VR、AR、全息投影等技术在主题乐园中的应用案例，以及它们带来的体验提升",
        thinking: "科技如何让游乐体验变得更加震撼和有趣？"
      },
      {
        stepNumber: 2,
        stepName: "设计科技项目",
        instruction: "为你的主题乐园设计一个科技互动项目",
        prompt: "帮我设计一个结合VR技术的飞行体验项目，包括故事情节、场景设计和互动环节",
        thinking: "如何平衡科技感和游乐性？"
      },
      {
        stepNumber: 3,
        stepName: "智能管理系统",
        instruction: "规划乐园的智能化管理和服务系统",
        thinking: "智能技术如何提升运营效率和游客体验？"
      }
    ]
  },
  {
    id: "13",
    title: "无障碍设计",
    description: "确保乐园对所有游客友好和无障碍",
    category: "包容性设计",
    estimatedTime: "20分钟",
    difficulty: "intermediate",
    learningObjectives: ["确保乐园对所有游客友好和无障碍"],
    knowledgePoints: [
      "理解无障碍设计的重要性",
      "掌握不同人群的特殊需求",
      "学会设计包容性的游乐体验"
    ],
    steps: [
      {
        stepNumber: 1,
        stepName: "了解无障碍需求",
        instruction: "学习不同人群在主题乐园中的特殊需求",
        prompt: "请介绍主题乐园中的无障碍设计要点，包括行动不便、视听障碍等人群的需求",
        thinking: "一个对所有人友好的乐园需要考虑哪些细节？"
      },
      {
        stepNumber: 2,
        stepName: "设计无障碍设施",
        instruction: "为你的乐园规划无障碍通道和设施",
        prompt: "帮我设计主题乐园的无障碍设施方案，包括无障碍通道、专用卫生间、轮椅租赁等",
        thinking: "如何让所有游客都能享受乐园的乐趣？"
      },
      {
        stepNumber: 3,
        stepName: "包容性体验设计",
        instruction: "设计适合不同能力游客的游乐项目",
        thinking: "怎样的设计能让每个人都有参与感？"
      }
    ]
  },
  {
    id: "14",
    title: "季节性活动策划",
    description: "设计全年的节日和特殊活动",
    category: "活动策划",
    estimatedTime: "25分钟",
    difficulty: "intermediate",
    learningObjectives: ["设计全年的节日和特殊活动"],
    knowledgePoints: [
      "了解季节性活动对乐园运营的重要性",
      "掌握节日主题活动的策划方法",
      "学会设计吸引回头客的特色活动"
    ],
    steps: [
      {
        stepNumber: 1,
        stepName: "规划活动日历",
        instruction: "制定全年的活动时间表",
        prompt: "帮我规划主题乐园一年中的重要活动，包括春节、儿童节、万圣节、圣诞节等节日活动",
        thinking: "如何通过活动吸引游客在不同季节都来游玩？"
      },
      {
        stepNumber: 2,
        stepName: "设计特色活动",
        instruction: "为一个节日设计详细的活动方案",
        prompt: "帮我设计一个万圣节主题活动方案，包括场景布置、特殊表演、限定商品等内容",
        thinking: "什么样的活动能让游客印象深刻并愿意再次光临？"
      },
      {
        stepNumber: 3,
        stepName: "夜间活动设计",
        instruction: "策划夜间特色活动提升体验",
        thinking: "夜间活动如何创造与白天不同的独特魅力？"
      }
    ]
  },
  {
    id: "15",
    title: "预算规划",
    description: "制定建设和运营的财务预算",
    category: "财务管理",
    estimatedTime: "30分钟",
    difficulty: "advanced",
    learningObjectives: ["制定建设和运营的财务预算"],
    knowledgePoints: [
      "了解主题乐园的成本构成",
      "掌握预算编制的方法",
      "学会平衡投资与收益"
    ],
    steps: [
      {
        stepNumber: 1,
        stepName: "建设成本估算",
        instruction: "估算主题乐园的初期建设投资",
        prompt: "请帮我估算一个中型主题乐园的建设成本，包括土地、游乐设施、建筑、景观等各项开支",
        thinking: "主题乐园建设需要在哪些方面投入资金？"
      },
      {
        stepNumber: 2,
        stepName: "运营成本规划",
        instruction: "计算日常运营所需费用",
        prompt: "帮我规划主题乐园的年度运营预算，包括人员工资、维护费用、营销支出等",
        thinking: "如何控制成本，保证乐园持续盈利？"
      },
      {
        stepNumber: 3,
        stepName: "收益预测",
        instruction: "预测乐园的收入来源和盈利情况",
        thinking: "除了门票，还有哪些收入来源？多久能收回投资？"
      }
    ]
  },
  {
    id: "16",
    title: "游客体验流程",
    description: "设计从入园到离园的完整游客旅程",
    category: "体验设计",
    estimatedTime: "25分钟",
    difficulty: "intermediate",
    learningObjectives: ["设计从入园到离园的完整游客旅程"],
    knowledgePoints: [
      "理解游客旅程的各个接触点",
      "掌握优化游客体验的方法",
      "学会设计流畅的游览动线"
    ],
    steps: [
      {
        stepNumber: 1,
        stepName: "绘制游客旅程图",
        instruction: "梳理游客从到达到离开的完整流程",
        prompt: "帮我设计一个主题乐园游客的完整旅程图，从停车入园、检票安检、游玩、用餐到购物离园",
        thinking: "游客在每个环节都会有什么需求和痛点？"
      },
      {
        stepNumber: 2,
        stepName: "优化关键环节",
        instruction: "针对重要环节提出改善方案",
        prompt: "分析主题乐园排队等候问题，提供减少等待时间、提升等候体验的解决方案",
        thinking: "如何消除游客旅程中的不愉快体验？"
      },
      {
        stepNumber: 3,
        stepName: "创造惊喜时刻",
        instruction: "设计超出预期的体验亮点",
        thinking: "什么样的惊喜能让游客留下难忘的回忆？"
      }
    ]
  },
  {
    id: "17",
    title: "品牌形象设计",
    description: "创建乐园的视觉识别系统和吉祥物",
    category: "品牌设计",
    estimatedTime: "30分钟",
    difficulty: "intermediate",
    learningObjectives: ["创建乐园的视觉识别系统和吉祥物"],
    knowledgePoints: [
      "理解品牌形象对主题乐园的重要性",
      "掌握视觉识别系统的设计要素",
      "学会创作有亲和力的吉祥物"
    ],
    steps: [
      {
        stepNumber: 1,
        stepName: "定位品牌个性",
        instruction: "确定你的主题乐园的品牌调性",
        prompt: "帮我为海洋主题乐园定义品牌个性，包括核心价值观、品牌故事和情感诉求",
        thinking: "什么样的品牌形象能让游客产生情感连接？"
      },
      {
        stepNumber: 2,
        stepName: "设计吉祥物",
        instruction: "创作主题乐园的代表性吉祥物",
        prompt: "为海洋主题乐园设计一个可爱的吉祥物，要有独特的性格和背景故事",
        thinking: "成功的吉祥物需要具备什么特质？"
      },
      {
        stepNumber: 3,
        stepName: "视觉系统设计",
        instruction: "建立统一的视觉识别规范",
        thinking: "如何通过视觉元素传达乐园的主题和氛围？"
      }
    ]
  },
  {
    id: "18",
    title: "最终方案展示",
    description: "整合所有元素，制作完整的主题乐园方案展示",
    category: "综合呈现",
    estimatedTime: "40分钟",
    difficulty: "advanced",
    learningObjectives: ["整合所有元素，制作完整的主题乐园方案展示"],
    knowledgePoints: [
      "掌握方案整合的方法",
      "学会制作专业的展示材料",
      "理解如何有效呈现创意"
    ],
    steps: [
      {
        stepNumber: 1,
        stepName: "整合前期成果",
        instruction: "回顾并整理前面所有任务的成果",
        prompt: "帮我设计一个主题乐园方案展示的框架，包含哪些关键部分？如何有逻辑地组织内容？",
        thinking: "如何把分散的创意整合成完整的方案？"
      },
      {
        stepNumber: 2,
        stepName: "制作展示材料",
        instruction: "创作吸引人的视觉展示内容",
        prompt: "帮我制作主题乐园的展示PPT大纲，包括封面、核心亮点、分区规划、商业模式等",
        thinking: "什么样的呈现方式最能打动观众？"
      },
      {
        stepNumber: 3,
        stepName: "准备演讲内容",
        instruction: "撰写方案介绍和演讲稿",
        thinking: "如何在有限时间内清晰地传达你的创意和价值？"
      }
    ]
  },
];
