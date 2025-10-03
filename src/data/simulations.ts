export interface Simulation {
  company: string;
  title: string;
  category: string;
  duration: string;
  imageUrl: string;
  logoUrl?: string;
  hiringNow?: boolean;
}

export const simulations: Simulation[] = [
  {
    company: "迪士尼乐园",
    title: "主题乐园设计师",
    category: "9岁+",
    duration: "约16个小时",
    imageUrl: "https://images.unsplash.com/photo-1590144662036-33bf0ebd2c7f",
    hiringNow: true,
  },
  {
    company: "美国花旗银行",
    title: "数学和数据分析项目",
    category: "12岁+",
    duration: "约3个小时",
    imageUrl: "https://images.unsplash.com/photo-1588600878108-578307a3cc9d",
    hiringNow: false,
  },
  {
    company: "索尼电影公司",
    title: "科幻小说作家",
    category: "包含6个项目",
    duration: "约6个小时",
    imageUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a",
    hiringNow: true,
  },
  {
    company: "可口可乐公司",
    title: "饮料销售经理",
    category: "包含4个项目",
    duration: "约3个小时",
    imageUrl: "https://images.unsplash.com/photo-1594971475674-6a97f8fe8c2b",
    hiringNow: true,
  },
];
