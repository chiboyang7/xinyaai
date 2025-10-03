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
  company: "NASA太空中心",
  title: "创造你的数学星球",
  category: "9岁+",
  duration: "10项技能",
  imageUrl: "https://images.unsplash.com/photo-1664854953181-b12e6dda8b7c",
  hiringNow: true,
}, 
  {
    company: "迪士尼乐园",
    title: "设计一个动漫乐园",
    category: "9岁+",
    duration: "12项技能",
    imageUrl: "https://images.unsplash.com/photo-1590144662036-33bf0ebd2c7f",
    hiringNow: true,
  },
  
  {
    company: "索尼电影公司",
    title: "写一篇科幻小说",
    category: "8岁+",
    duration: "6项技能",
    imageUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a",
    hiringNow: true,
  },
{
  company: "唐朝文学院",
  title: "和李白对话学古诗",
  category: "8岁+",
  duration: "8项技能",
  imageUrl: "https://plus.unsplash.com/premium_photo-1697729890503-bcb24e606a2c",
  hiringNow: true,
},
  {
    company: "可口可乐公司",
    title: "开一家冷饮店",
    category: "12岁+",
    duration: "15项技能",
    imageUrl: "https://images.unsplash.com/photo-1594971475674-6a97f8fe8c2b",
    hiringNow: false,
  },

{
  company: "环球旅行社",
  title: "用英语环游80个国家",
  category: "10岁+",
  duration: "12项技能",
  imageUrl: "",
  hiringNow: true,
},
{
  company: "爱因斯坦实验室",
  title: "成为科学小侦探",
  category: "9岁+",
  duration: "9项技能",
  imageUrl: "",
  hiringNow: false,
},
{
  company: "哈利波特魔法学院",
  title: "用数学解开魔法密码",
  category: "10岁+",
  duration: "11项技能",
  imageUrl: "",
  hiringNow: true,
},
{
  company: "时光穿梭机公司",
  title: "穿越历史当小记者",
  category: "11岁+",
  duration: "9项技能",
  imageUrl: "",
  hiringNow: false,
},
{
  company: "畅销书作家工作室",
  title: "写一本自己的小说",
  category: "10岁+",
  duration: "10项技能",
  imageUrl: "",
  hiringNow: true,
},
{
  company: "奥数冠军训练营",
  title: "数学闯关大冒险",
  category: "9岁+",
  duration: "11项技能",
  imageUrl: "",
  hiringNow: true,
},
{
  company: "牛津演讲俱乐部",
  title: "成为英语演讲小达人",
  category: "11岁+",
  duration: "8项技能",
  imageUrl: "",
  hiringNow: false,
},
{
  company: "清华大学AI实验室",
  title: "教AI读懂语文课本",
  category: "12岁+",
  duration: "10项技能",
  imageUrl: "",
  hiringNow: true,
},
  {
    company: "美国花旗银行",
    title: "数学和数据分析项目",
    category: "12岁+",
    duration: "8项技能",
    imageUrl: "https://images.unsplash.com/photo-1588600878108-578307a3cc9d",
    hiringNow: false,
  },
];
