export interface Dimension {
  id: number;
  name: string;
  description: string;
  careers: string[];
  details?: {
    skills?: string[];
    examples?: string[];
  };
}

export const dimensions: Dimension[] = [
  {
    id: 1,
    name: "探索 (Exploration)",
    description: "发现问题、提出问题、分析问题的能力",
    careers: ["数据分析师", "研究员", "产品经理"],
    details: {
      skills: ["批判性思维", "问题分析", "信息收集"],
      examples: ["市场调研", "用户研究", "需求分析"]
    }
  },
  {
    id: 2,
    name: "推理 (Reasoning)",
    description: "逻辑推理、数据分析、决策判断的能力",
    careers: ["AI工程师", "咨询顾问", "战略分析师"],
    details: {
      skills: ["逻辑思维", "数据驱动决策", "模式识别"],
      examples: ["算法设计", "商业分析", "风险评估"]
    }
  },
  {
    id: 3,
    name: "创意 (Innovation)",
    description: "创造性思维、创新方案设计的能力",
    careers: ["UI/UX设计师", "创意总监", "产品设计师"],
    details: {
      skills: ["创造力", "设计思维", "创新能力"],
      examples: ["产品设计", "品牌策划", "用户体验优化"]
    }
  },
  {
    id: 4,
    name: "协作 (Collaboration)",
    description: "团队协作、沟通表达、项目管理的能力",
    careers: ["项目经理", "团队领导", "运营经理"],
    details: {
      skills: ["沟通能力", "团队管理", "协调能力"],
      examples: ["跨部门协作", "项目管理", "团队建设"]
    }
  },
  {
    id: 5,
    name: "适应 (Adaptation)",
    description: "学习新技能、适应变化、持续成长的能力",
    careers: ["AI培训师", "技术顾问", "创业者"],
    details: {
      skills: ["快速学习", "灵活应变", "持续进步"],
      examples: ["新技术学习", "业务转型", "职业发展"]
    }
  }
];
