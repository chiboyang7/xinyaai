export interface Simulation {
  company: string;
  title: string;
  age: string;
  skills: string;
  imageUrl: string;
  logoUrl?: string;
  hiringNow?: boolean;
}

export const simulations: Simulation[] = [
  {
    company: "迪士尼乐园",
    title: "主题乐园设计师",
    age: "9岁+",
    skills: "约16个小时",
    imageUrl: "https://images.unsplash.com/photo-1590144662036-33bf0ebd2c7f",
    hiringNow: true,
  },
  {
    company: "美国花旗银行",
    title: "数学和数据分析项目",
    age: "12岁+",
    skills: "约3个小时",
    imageUrl: "https://images.unsplash.com/photo-1588600878108-578307a3cc9d",
    hiringNow: false,
  },
  {
    company: "索尼电影公司",
    title: "科幻小说作家",
    age: "包含6个项目",
    skills: "约6个小时",
    imageUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a",
    hiringNow: true,
  },
  {
    company: "可口可乐公司",
    title: "饮料销售经理",
    age: "包含4个项目",
    skills: "约3个小时",
    imageUrl: "https://images.unsplash.com/photo-1594971475674-6a97f8fe8c2b",
    hiringNow: true,
  },
];
