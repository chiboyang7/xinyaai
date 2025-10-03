export interface Simulation {
  company: string;
  title: string;
  category: string;
  duration: string;
  imageUrl: string;
  logoUrl?: string;
  hiringNow?: boolean;
  link?: string;
}

export const simulations: Simulation[] = [
  {
  company: "NASA太空中心",
  title: "创造你的数学星球",
  category: "9岁+",
  duration: "10项技能",
  imageUrl: "https://plus.unsplash.com/premium_photo-1663127162950-23812ec8bdad",
  hiringNow: true,
}, 
  {
    company: "迪士尼乐园",
    title: "设计未来主题乐园",
    category: "10岁+",
    duration: "12项技能",
    imageUrl: "https://images.unsplash.com/photo-1590144662036-33bf0ebd2c7f",
    hiringNow: true,
    link: "/future-themepark",
  },
  {
  company: "MIT数学科技公司",
  title: "用数学模型设计游戏",
  category: "10岁+",
  duration: "11项技能",
  imageUrl: "https://plus.unsplash.com/premium_photo-1661964115368-6011b5c9e0e8",
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
    company: "索尼电影公司",
    title: "写一篇科幻小说",
    category: "8岁+",
    duration: "6项技能",
    imageUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a",
    hiringNow: true,
  },

  {
    company: "可口可乐公司",
    title: "咖啡店的商业计划书",
    category: "14岁+",
    duration: "15项技能",
    imageUrl: "https://images.unsplash.com/photo-1594971475674-6a97f8fe8c2b",
    hiringNow: false,
  },

{
  company: "ABC环球旅行社",
  title: "用英语环游80个国家",
  category: "15岁+",
  duration: "12项技能",
  imageUrl: "https://images.unsplash.com/photo-1521295121783-8a321d551ad2",
  hiringNow: false,
},
  {
  company: "剑桥大学",
  title: "AI逻辑思维与编程训练",
  category: "13岁+",
  duration: "11项技能",
  imageUrl: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
  hiringNow: false,
},
  {
  company: "贝尔实验室",
  title: "成为科学小侦探",
  category: "12岁+",
  duration: "9项技能",
  imageUrl: "https://plus.unsplash.com/premium_photo-1663011256706-72d0b535b1ee",
  hiringNow: false,
},
{
  company: "哈利波特魔法学院",
  title: "用数学解开魔法密码",
  category: "10岁+",
  duration: "11项技能",
  imageUrl: "https://images.unsplash.com/photo-1618944913480-b67ee16d7b77",
  hiringNow: false,
},
{
  company: "多啦A梦公司",
  title: "穿越历史当小记者",
  category: "10岁+",
  duration: "9项技能",
  imageUrl: "https://plus.unsplash.com/premium_photo-1683121496115-f2e22066dcf4",
  hiringNow: false,
},
{
  company: "清华大学出版社",
  title: "给爸爸妈妈写一本书",
  category: "10岁+",
  duration: "10项技能",
  imageUrl: "https://images.unsplash.com/photo-1659407930506-9813058a3c47",
  hiringNow: true,
},

{
  company: "牛津演讲俱乐部",
  title: "成为英语演讲小达人",
  category: "11岁+",
  duration: "8项技能",
  imageUrl: "https://plus.unsplash.com/premium_photo-1683133757924-9bdece92f6bb",
  hiringNow: false,
},
{
  company: "故宫博物院",
  title: "教AI读懂语文课本",
  category: "12岁+",
  duration: "10项技能",
  imageUrl: "https://images.unsplash.com/photo-1720702214634-c1ece3a7d364",
  hiringNow: false,
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
