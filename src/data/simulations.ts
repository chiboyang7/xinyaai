export interface Simulation {
  company: string;
  title: string;
  category: string;
  duration: string;
  difficulty: string;
  imageUrl: string;
  logoUrl?: string;
  hiringNow?: boolean;
  link?: string;
  badgeType: "科学竞赛" | "AI智能体" | "艺术创作" | "综合素质";
}

export const simulations: Simulation[] = [
  {
  company: "NASA太空中心",
  title: "创造你的数学星球",
  category: "10岁+",
  duration: "16项技能",
  difficulty: "容易",
  imageUrl: "https://plus.unsplash.com/premium_photo-1663127162950-23812ec8bdad",
  hiringNow: false,
  badgeType: "科学竞赛",
},
  {
    company: "迪士尼乐园",
    title: "设计未来主题乐园",
    category: "9岁+",
    duration: "12项技能",
    difficulty: "容易",
    imageUrl: "https://images.unsplash.com/photo-1590144662036-33bf0ebd2c7f",
    hiringNow: true,
    link: "/future-themepark",
    badgeType: "艺术创作",
  },
  {
  company: "MIT数学科技公司",
  title: "用数学模型设计游戏",
  category: "11岁+",
  duration: "11项技能",
  difficulty: "中等",
  imageUrl: "https://plus.unsplash.com/premium_photo-1661964115368-6011b5c9e0e8",
  hiringNow: true,
  link: "/math-game-design",
  badgeType: "科学竞赛",
},
{
  company: "唐朝文学院",
  title: "做一个写诗的AI智能体",
  category: "11岁+",
  duration: "8项技能",
  difficulty: "中等",
  imageUrl: "https://plus.unsplash.com/premium_photo-1697729890503-bcb24e606a2c",
  hiringNow: true,
  link: "/poetry-with-libai",
  badgeType: "AI智能体",
},
  {
    company: "索尼电影公司",
    title: "改写一篇完美的文章",
    category: "9岁+",
    duration: "6项技能",
    difficulty: "容易",
    imageUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a",
    hiringNow: true,
    link: "/perfect-writing",
    badgeType: "艺术创作",
  },

  {
    company: "可口可乐公司",
    title: "咖啡店的商业计划书",
    category: "14岁+",
    duration: "15项技能",
    difficulty: "困难",
    imageUrl: "https://images.unsplash.com/photo-1594971475674-6a97f8fe8c2b",
    hiringNow: false,
    badgeType: "综合素质",
  },

{
  company: "ABC环球旅行社",
  title: "用英语环游80个国家",
  category: "12岁+",
  duration: "12项技能",
  difficulty: "中等",
  imageUrl: "https://images.unsplash.com/photo-1521295121783-8a321d551ad2",
  hiringNow: false,
  badgeType: "艺术创作",
},
  {
  company: "剑桥大学",
  title: "AI逻辑思维与编程训练",
  category: "13岁+",
  duration: "11项技能",
  difficulty: "困难",
  imageUrl: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
  hiringNow: false,
  badgeType: "AI智能体",
},
  {
  company: "贝尔实验室",
  title: "研发一个AI特工",
  category: "12岁+",
  duration: "9项技能",
  difficulty: "困难",
  imageUrl: "https://plus.unsplash.com/premium_photo-1663011256706-72d0b535b1ee",
  hiringNow: false,
  badgeType: "AI智能体",
},
  {
  company: "清华大学出版社",
  title: "撰写一本为你定制的教科书",
  category: "12岁+",
  duration: "10项技能",
  difficulty: "中等",
  imageUrl: "https://images.unsplash.com/photo-1659407930506-9813058a3c47",
  hiringNow: false,
  badgeType: "综合素质",
},
{
  company: "哈利波特魔法学院",
  title: "创建一个算命女巫",
  category: "10岁+",
  duration: "11项技能",
  difficulty: "容易",
  imageUrl: "https://images.unsplash.com/photo-1618944913480-b67ee16d7b77",
  hiringNow: false,
  badgeType: "AI智能体",
},
{
  company: "多啦A梦公司",
  title: "穿越历史当小记者",
  category: "10岁+",
  duration: "9项技能",
  difficulty: "容易",
  imageUrl: "https://plus.unsplash.com/premium_photo-1683121496115-f2e22066dcf4",
  hiringNow: false,
  badgeType: "综合素质",
},

{
  company: "牛津演讲俱乐部",
  title: "成为英语演讲小达人",
  category: "11岁+",
  duration: "8项技能",
  difficulty: "容易",
  imageUrl: "https://plus.unsplash.com/premium_photo-1683133757924-9bdece92f6bb",
  hiringNow: false,
  badgeType: "综合素质",
},
{
  company: "故宫博物院",
  title: "用AI创作一本语文书",
  category: "12岁+",
  duration: "10项技能",
  difficulty: "中等",
  imageUrl: "https://images.unsplash.com/photo-1720702214634-c1ece3a7d364",
  hiringNow: false,
  badgeType: "艺术创作",
},
  {
    company: "美国花旗银行",
    title: "数学和数据分析项目",
    category: "12岁+",
    duration: "8项技能",
    difficulty: "困难",
    imageUrl: "https://images.unsplash.com/photo-1588600878108-578307a3cc9d",
    hiringNow: false,
    badgeType: "科学竞赛",
  },

];
