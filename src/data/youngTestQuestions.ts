export interface Question {
  id: number;
  section: string;
  title: string;
  content: string;
  options: {
    label: string;
    text: string;
    score: number;
    dimensions: { [key: string]: number };
  }[];
  correctAnswer: string;
  maxScore: number;
}

export const youngTestQuestions: Question[] = [
  // 第一部分：AI基础认知（6题）
  {
    id: 1,
    section: "第一部分：AI基础认知",
    title: "AI的工作原理",
    content: '你问豆包："明天会下雨吗？"它回答："根据天气预报，明天有60%的概率下雨，建议带伞。"\n\nAI是怎么得出这个答案的？',
    options: [
      {
        label: "A",
        text: "AI连接了天气网站，实时查询了明天的天气预报数据，然后把结果告诉你。不过这需要联网功能，如果网络不好的话可能就没法回答了。",
        score: 2,
        dimensions: { R: 1.4, E: 0.6 }
      },
      {
        label: "B",
        text: "AI在训练时学习过很多天气相关的对话，它根据你的问题，生成了一个\"看起来像天气预报\"的回答。实际上它可能并不知道真实天气，只是在模仿它学过的内容。",
        score: 6,
        dimensions: { R: 4.2, E: 1.8 }
      },
      {
        label: "C",
        text: "AI先理解了你的问题是在问天气，然后调用了内置的天气数据库，找到对应城市明天的天气信息。这个数据库每天都会自动更新，所以给出的信息是比较准确的。",
        score: 2,
        dimensions: { R: 1.4, E: 0.6 }
      },
      {
        label: "D",
        text: "AI有专门的天气预测算法，通过分析大气压、温度、湿度等数据计算出来的。这是AI最擅长的领域，因为它能处理复杂计算，预测准确度比人更高。",
        score: 3,
        dimensions: { R: 2.1, E: 0.9 }
      }
    ],
    correctAnswer: "B",
    maxScore: 6
  },
  {
    id: 2,
    section: "第一部分:AI基础认知",
    title: "设计天气AI应用",
    content: "你想做一个\"智能天气助手\"，不只是查天气，还能给生活建议。\n\n以下哪个设计方案最好？",
    options: [
      {
        label: "A",
        text: "只查天气数据，告诉用户\"明天20℃，晴天\"。简单直接，不容易出错，用户自己判断要不要带伞、穿什么衣服。",
        score: 2,
        dimensions: { R: 1.2, I: 0.8 }
      },
      {
        label: "B",
        text: "AI查天气后，根据温度和天气情况给建议：\"明天20℃晴天，建议穿长袖，不用带伞。\"自动给用户提供穿衣建议，更方便实用。",
        score: 3,
        dimensions: { R: 1.8, I: 1.2 }
      },
      {
        label: "C",
        text: "AI查到天气后，结合用户的日程安排给个性化建议：\"明天有雨，你下午3点有足球训练，记得带伞和备用衣服。\"更智能，考虑用户的具体需求。",
        score: 5,
        dimensions: { R: 3.0, I: 2.0 }
      },
      {
        label: "D",
        text: "综合方案：AI先从权威天气网站获取数据（确保准确），然后根据用户设置的个人信息（年龄、活动计划、健康状况）给建议，还会学习用户习惯（比如你怕冷，会建议多穿点）。同时标注数据来源和更新时间，让用户知道信息是否可靠。",
        score: 6,
        dimensions: { R: 3.6, I: 2.4 }
      }
    ],
    correctAnswer: "D",
    maxScore: 6
  },
  {
    id: 3,
    section: "第一部分：AI基础认知",
    title: "AI能力边界",
    content: '你的朋友说："AI太厉害了！以后医生、律师、老师都会被AI取代，我们学习都没用了。"\n\n你怎么看这个说法？',
    options: [
      {
        label: "A",
        text: "部分对，部分错。AI会取代一些重复性的工作（如简单的数据录入、客服回答），但创造性、情感性、复杂决策的工作还是需要人。我们要学会与AI协作，发挥各自优势，而不是被它替代。",
        score: 6,
        dimensions: { R: 4.8, I: 1.2 }
      },
      {
        label: "B",
        text: "不太对，AI只是看起来厉害，实际上很多都是\"表面功夫\"。它会说错话、会出bug、还经常不理解人的真实需求。真正重要的工作都需要人来做决策，AI目前只能打打下手。",
        score: 3,
        dimensions: { R: 2.4, I: 0.6 }
      },
      {
        label: "C",
        text: "确实如此，AI现在已经能写文章、画画、写代码，技术发展这么快，用不了几年就能做所有人类的工作。我们应该尽早适应这个趋势，学习一些AI做不了的技能。",
        score: 2,
        dimensions: { R: 1.6, I: 0.4 }
      },
      {
        label: "D",
        text: "这个说法太绝对了。AI虽然能辅助很多工作，但医生需要关心病人，老师需要因材施教，律师需要判断复杂情况，这些都需要人的情感和智慧。AI只是工具，不能完全替代人。",
        score: 4,
        dimensions: { R: 3.2, I: 0.8 }
      }
    ],
    correctAnswer: "A",
    maxScore: 6
  },
  {
    id: 4,
    section: "第一部分：AI基础认知",
    title: "AI幻觉现象识别",
    content: '你在做历史作业，问DeepSeek："中国古代四大发明是什么？"\n\nAI回答："中国古代四大发明是造纸术、印刷术、火药、指南针。这四项发明都是在唐朝时期完成的，对世界文明产生了深远影响。"\n\n这个回答有什么问题？你该怎么办？',
    options: [
      {
        label: "A",
        text: "没有问题，四大发明确实是这四个，AI回答得很准确。我可以直接把这个答案写在作业上，应该不会有什么问题的。",
        score: 0,
        dimensions: { R: 0, E: 0 }
      },
      {
        label: "B",
        text: "AI说的四大发明是对的，但\"都是唐朝\"好像有点不对劲。我应该去百度搜一下，或者翻翻历史书确认一下具体的朝代，毕竟这是历史知识，需要准确。",
        score: 3,
        dimensions: { R: 2.1, E: 0.9 }
      },
      {
        label: "C",
        text: "发现了问题：\"四大发明\"不是同一个朝代发明的！我应该查课本确认准确的朝代信息。AI在历史、时间等事实性知识上可能出错，重要的内容必须验证，不能盲目相信。",
        score: 6,
        dimensions: { R: 4.2, E: 1.8 }
      },
      {
        label: "D",
        text: "AI犯了\"幻觉\"错误，把不同朝代的发明说成了同一时期。正确做法是查阅历史课本，然后可以告诉AI它说错了。这提醒我：以后遇到历史、数字等精确信息都要核实。",
        score: 5,
        dimensions: { R: 3.5, E: 1.5 }
      }
    ],
    correctAnswer: "C",
    maxScore: 6
  },
  {
    id: 5,
    section: "第一部分：AI基础认知",
    title: "信息验证方法",
    content: '你在做科学小报告，问豆包："世界上飞得最高的鸟是什么？能飞多高？"\n\nAI回答："黑白兀鹫是飞得最高的鸟，曾有记录飞到11300米高空，比珠穆朗玛峰还高。"\n\n你应该怎么做？',
    options: [
      {
        label: "A",
        text: "AI回答得很具体，还有准确的数字，看起来很专业。我可以直接用在报告里，应该不会错。",
        score: 0,
        dimensions: { R: 0, A: 0 }
      },
      {
        label: "B",
        text: "先在百度上搜一下\"飞得最高的鸟\"，看看其他网站是怎么说的。如果多个网站都这么说，那应该就是对的。",
        score: 3,
        dimensions: { R: 2.4, A: 0.6 }
      },
      {
        label: "C",
        text: "这是科学数据，比较重要，我要查教材或《动物百科全书》确认。如果书上找不到，可以去科学网站（如科普中国）查，确保信息准确。",
        score: 5,
        dimensions: { R: 4.0, A: 1.0 }
      },
      {
        label: "D",
        text: "多渠道验证：查教材或百科全书的权威信息，访问科学网站（如科普中国、国家地理）获取数据，对比AI说的是否准确，特别注意数字（11300米）。报告里要注明资料来源，比如\"据《动物世界百科》...\"，这是科学态度。",
        score: 6,
        dimensions: { R: 4.8, A: 1.2 }
      }
    ],
    correctAnswer: "D",
    maxScore: 6
  },
  {
    id: 6,
    section: "第一部分：AI基础认知",
    title: "AI使用时机判断",
    content: "周末你有4件事要做，哪些适合用AI帮忙？\n\n1. 查资料：了解\"火山是怎么形成的\"\n2. 写日记：记录今天去公园玩的感受\n3. 学英语：练习英语对话\n4. 选礼物：给好朋友选生日礼物\n\n哪个判断最合理？",
    options: [
      {
        label: "A",
        text: "全部都可以用AI。第1个查资料，第2个帮我写得更好，第3个陪我练习，第4个给我建议。AI能帮的都应该用。",
        score: 1,
        dimensions: { R: 0.6, A: 0.4 }
      },
      {
        label: "B",
        text: "第1个和第3个可以用AI。查资料和练英语AI很擅长；但第2个写日记要表达真实感受，第4个选礼物要了解朋友，AI不了解情况，这两个不适合。",
        score: 3,
        dimensions: { R: 1.8, A: 1.2 }
      },
      {
        label: "C",
        text: "四件事用AI的方式不同：①查资料：可以用，但要核对信息；②写日记：AI可以帮改错字，但内容要自己写；③学英语：AI是好帮手；④选礼物：AI可以列出选项，但要我自己根据朋友喜好选。",
        score: 6,
        dimensions: { R: 3.6, A: 2.4 }
      },
      {
        label: "D",
        text: "要建立使用规则：知识查询、技能练习适合用AI（但要验证）；创作类任务AI只能辅助；涉及个人情感和了解他人的事，核心判断必须自己做。具体说：①适合，需验证；②内容自己写；③很适合；④AI提供思路，我做决定。",
        score: 5,
        dimensions: { R: 3.0, A: 2.0 }
      }
    ],
    correctAnswer: "C",
    maxScore: 6
  },
  // 第二部分：AI学习应用（6题）
  {
    id: 7,
    section: "第二部分：AI学习应用",
    title: "用AI学英语",
    content: '你要准备英语口语考试，主题是"介绍我的家乡"，需要说2分钟。\n\n以下哪种方法最有效？',
    options: [
      {
        label: "A",
        text: "让豆包写一篇英语稿子，我背下来，考试时背出来。这样最保险，语法肯定没错。",
        score: 2,
        dimensions: { E: 1.4, C: 0.6 }
      },
      {
        label: "B",
        text: "我用中文写下想说的内容，让AI翻译成英语，然后我背下来。这样既有自己的想法，英语表达也准确。",
        score: 4,
        dimensions: { E: 2.8, C: 1.2 }
      },
      {
        label: "C",
        text: "让AI列出介绍家乡要讲的要点（美食、风景、特色），我用简单英语写出来，AI帮我改语法错误，然后用AI语音功能练习发音。内容是我自己的，AI帮我改进表达。",
        score: 6,
        dimensions: { E: 4.2, C: 1.8 }
      },
      {
        label: "D",
        text: "完整学习方案：先问AI\"介绍家乡要讲什么更有趣？\"确定框架→我用中文列出想法，AI帮翻译成简单英语→用AI语音对话功能，让AI当\"考官\"，我练习说，AI纠正发音和语法→录下自己的讲述，听一遍找问题→让AI给改进建议→反复练习到流利。",
        score: 5,
        dimensions: { E: 3.5, C: 1.5 }
      }
    ],
    correctAnswer: "C",
    maxScore: 6
  },
  {
    id: 8,
    section: "第二部分：AI学习应用",
    title: "用AI提高数学成绩",
    content: "你的数学应用题总是做不好，想用AI帮忙提高。\n\n以下哪种方式最能真正提高数学能力？",
    options: [
      {
        label: "A",
        text: "遇到不会的题就问AI，让它讲解答案。AI讲得很清楚，多问几次就能学会了。",
        score: 2,
        dimensions: { E: 1.6, R: 0.4 }
      },
      {
        label: "B",
        text: "让AI给我出很多练习题，我多做题就能提高。题海战术虽然辛苦，但有效。",
        score: 3,
        dimensions: { E: 2.4, R: 0.6 }
      },
      {
        label: "C",
        text: "我自己先做题，做完后让AI检查答案。错的题目，我不看答案先自己再想一遍，实在不会再让AI讲解思路（不直接给答案）。AI讲完我自己重新做一遍，确保真的懂了。",
        score: 6,
        dimensions: { E: 4.8, R: 1.2 }
      },
      {
        label: "D",
        text: "系统学习方法：先自己独立做题→做完让AI检查，AI只告诉我哪道错了，不给答案→我重新思考，还是不会就让AI给提示（比如\"先算什么\"），不直接讲解→我根据提示做出来→让AI帮我总结这类题的解题方法→AI针对我的薄弱点出类似题练习→每周让AI生成学习报告，看哪类题还不熟。",
        score: 5,
        dimensions: { E: 4.0, R: 1.0 }
      }
    ],
    correctAnswer: "C",
    maxScore: 6
  },
  {
    id: 9,
    section: "第二部分：AI学习应用",
    title: "用AI提高作文水平",
    content: "老师布置作文《一次难忘的旅行》，你想用AI帮助写得更好。\n\n以下哪种方式既能提高作文，又能锻炼写作能力？",
    options: [
      {
        label: "A",
        text: "让DeepSeek写一篇，我读一遍，改几个地方就交了。AI写得比我好，为什么不用呢？",
        score: 0,
        dimensions: { C: 0, E: 0 }
      },
      {
        label: "B",
        text: "我自己写完整篇作文，然后让AI帮我检查错别字和语句通顺。AI只做\"检查员\"，不改内容。",
        score: 4,
        dimensions: { C: 2.8, E: 1.2 }
      },
      {
        label: "C",
        text: "分步骤：我先列出提纲（去了哪里、发生了什么、有什么感受）→让AI看提纲，问它\"这个结构合理吗？有什么建议？\"→我根据建议调整提纲→自己写作文→AI帮我看：哪些地方可以写得更生动？哪里用词可以改进？→我根据建议修改→最终作文是我自己的，但质量提高了。",
        score: 6,
        dimensions: { C: 4.2, E: 1.8 }
      },
      {
        label: "D",
        text: "我写一段，AI给建议，我改；再写一段，AI再给建议。一边写一边让AI指导，这样能学到很多写作技巧。",
        score: 3,
        dimensions: { C: 2.1, E: 0.9 }
      }
    ],
    correctAnswer: "C",
    maxScore: 6
  },
  {
    id: 10,
    section: "第二部分：AI学习应用",
    title: "AI辅助学习的边界",
    content: "期末考试前，你想用AI帮忙复习。\n\n以下哪种做法最合理？",
    options: [
      {
        label: "A",
        text: "把所有知识点都问一遍AI，让它给我总结，我背下来就行。这样复习最高效。",
        score: 1,
        dimensions: { R: 0.7, E: 0.3 }
      },
      {
        label: "B",
        text: "让AI出一套模拟试卷，我做完后AI批改打分，告诉我哪里错了。这样可以查漏补缺。",
        score: 4,
        dimensions: { R: 2.8, E: 1.2 }
      },
      {
        label: "C",
        text: "我先自己复习课本和笔记，整理不懂的知识点，然后让AI讲解这些难点。复习完后让AI出题测试，检验是否真的掌握了。重点是自己先学，AI帮助补充和检验。",
        score: 5,
        dimensions: { R: 3.5, E: 1.5 }
      },
      {
        label: "D",
        text: "复习流程：我先过一遍课本，标记不懂的地方→让AI讲解疑难点（要求它用简单方式讲，不直接背定义）→我用自己的话总结给AI听，AI判断我是否理解→让AI出题测试→错的题AI讲解后，我重新做→考前让AI帮我做知识点串联（比如用思维导图）。核心是AI帮我理解，不是替我记忆。",
        score: 6,
        dimensions: { R: 4.2, E: 1.8 }
      }
    ],
    correctAnswer: "D",
    maxScore: 6
  },
  {
    id: 11,
    section: "第二部分：AI学习应用",
    title: "多轮学习对话",
    content: '你在学习"光合作用"，想让AI帮你理解。\n\n以下哪种对话方式学习效果最好？',
    options: [
      {
        label: "A",
        text: '你："什么是光合作用？" → AI：（详细解释） → 你："好的，谢谢。"',
        score: 1,
        dimensions: { C: 0.7, E: 0.3 }
      },
      {
        label: "B",
        text: '你："什么是光合作用？" → AI：（解释） → 你："没太懂，简单点说？" → AI：（简化） → 你："那植物晚上也光合作用吗？" → AI：（回答）',
        score: 3,
        dimensions: { C: 2.1, E: 0.9 }
      },
      {
        label: "C",
        text: '你："我要学光合作用，我是初中生。请这样教：①一句话解释 ②详细讲过程（分步）③每步我说\'下一个\'你再讲。开始吧！" → AI：（讲第一步） → 你："懂了，下一个。" → AI：（讲第二步） → 你："这步没懂，用比喻解释？" → AI：（用比喻） → 你："明白了！出3道题测试我。"',
        score: 6,
        dimensions: { C: 4.2, E: 1.8 }
      },
      {
        label: "D",
        text: '你："帮我理解光合作用可以吗？" → AI："当然！想先了解什么？" →你："先简单说它是什么意思。" → AI：（简单解释） → 你："懂了！那具体过程呢？" → AI：（详细讲） → 你："第二步有个词不懂：叶绿素是什么？" → AI：（解释） → 你："可以出题测试我吗？"',
        score: 5,
        dimensions: { C: 3.5, E: 1.5 }
      }
    ],
    correctAnswer: "C",
    maxScore: 6
  },
  {
    id: 12,
    section: "第二部分：AI学习应用",
    title: "学习工具组合",
    content: "你要准备一个历史课的展示：《丝绸之路》（需要演讲+PPT）。\n\n可用工具：DeepSeek（文字）、Midjourney（AI绘图）、Canva（设计工具）\n\n你会怎么做？",
    options: [
      {
        label: "A",
        text: "用豆包做所有事情：写文字、生成图片、设计排版。一个工具搞定最方便。",
        score: 2,
        dimensions: { E: 1.4, A: 0.6 }
      },
      {
        label: "B",
        text: "DeepSeek写文字内容，我自己做PPT。AI帮内容，我负责设计，分工明确。",
        score: 4,
        dimensions: { E: 2.8, A: 1.2 }
      },
      {
        label: "C",
        text: "AI帮我查资料和列出框架 → 我去查历史书核对信息 → 自己写演讲稿，AI帮润色 → 用AI绘图工具生成丝绸之路的图片 → 我用PPT工具（如WPS）排版，把文字和图片组合好 → 给同学试讲，收集意见 → AI帮我分析建议，我调整内容。",
        score: 5,
        dimensions: { E: 3.5, A: 1.5 }
      },
      {
        label: "D",
        text: "先用AI了解丝绸之路的关键信息和有趣故事，确定讲什么能吸引同学。然后查课本和历史网站核对重要事实。我写演讲稿，AI帮我看表达是否清楚、有无错误。AI绘图工具做几张示意图，我挑最好的。自己用PPT把内容组织好，不要太多字，多用图。最后练习几遍，让AI当听众给反馈，我根据反馈调整。重点是每个环节我做主要工作，AI辅助提高质量。",
        score: 6,
        dimensions: { E: 4.2, A: 1.8 }
      }
    ],
    correctAnswer: "D",
    maxScore: 6
  },
  // 第三部分：AI技术应用（6题）
  {
    id: 13,
    section: "第三部分：AI技术应用",
    title: "提示词设计技巧",
    content: '你想让DeepSeek帮你准备一场"保护海洋"的演讲（3分钟，给同学听）。\n\n你会怎么向AI提问？',
    options: [
      {
        label: "A",
        text: "\"请帮我写一篇演讲稿：主题是保护海洋，时长3分钟，听众是同学。\"说明主题、时长、听众，AI应该能写出合适的内容。",
        score: 4,
        dimensions: { E: 3.2, C: 0.8 }
      },
      {
        label: "B",
        text: "\"帮我写一个关于保护海洋的演讲稿。\"简单直接，AI应该知道怎么写，不满意再让它重写。",
        score: 2,
        dimensions: { E: 1.6, C: 0.4 }
      },
      {
        label: "C",
        text: "\"请帮我写演讲稿：主题保护海洋，3分钟（约400字），听众是初中同学，语言简单易懂，举1个海洋污染的例子。\"",
        score: 5,
        dimensions: { E: 4.0, C: 1.0 }
      },
      {
        label: "D",
        text: "\"我是初二学生，要做3分钟演讲。请这样帮我：①先给我3个关于'保护海洋'的切入角度（如塑料污染、过度捕捞等）②我选好角度后，你提供演讲结构建议（开头/主体/结尾）、2个具体例子、一些触动人心的表达 ③然后我自己组织语言，写完后你帮我检查逻辑和文字。这样既保证质量，又是我自己的作品。\"",
        score: 6,
        dimensions: { E: 4.8, C: 1.2 }
      }
    ],
    correctAnswer: "D",
    maxScore: 6
  },
  {
    id: 14,
    section: "第三部分：AI技术应用",
    title: "提示词迭代优化",
    content: '你让豆包写一个"节约用水"的倡议书（给同学看）。\n\n第一次问："写一个节约用水的倡议书。"\nAI给了一篇，但太正式，像官方文件，有很多同学看不懂的词。\n\n你该怎么改进？',
    options: [
      {
        label: "A",
        text: "\"再写一个节约用水的倡议书，这次写得好一点。\"希望AI能理解我的意思。",
        score: 1,
        dimensions: { E: 0.6, C: 0.4 }
      },
      {
        label: "B",
        text: "\"写一个简单点的倡议书，不要太正式，要同学能看懂的。\"给出大概方向。",
        score: 3,
        dimensions: { E: 1.8, C: 1.2 }
      },
      {
        label: "C",
        text: "\"请重新写，要求：语言通俗像说话，不要太多成语和大词，300字左右，包括为什么要节约、我们能做什么。\"",
        score: 5,
        dimensions: { E: 3.0, C: 2.0 }
      },
      {
        label: "D",
        text: "多轮改进：\"这版太正式。请改成适合中学生的版本，用我们平时说话的语气，少用成语。\"（AI改后）\"第一段保留，但能用一个问题开头吗？比如'你知道一个人每天要用多少水吗？'这样更吸引人。\"（AI再改）\"很好！最后检查下：有无错字、语句是否通顺、内容是否重复。\"",
        score: 6,
        dimensions: { E: 3.6, C: 2.4 }
      }
    ],
    correctAnswer: "D",
    maxScore: 6
  },
  {
    id: 15,
    section: "第三部分：AI技术应用",
    title: "AI工具组合策略",
    content: "你要制作\"中国传统节日\"介绍海报（图片+文字）。\n\n可用工具：DeepSeek（文字）、Midjourney（AI绘图）、Canva（设计工具）\n\n你会怎么做？",
    options: [
      {
        label: "A",
        text: "用DeepSeek做所有事情：写文字、生成图片、设计排版。一个工具搞定。",
        score: 2,
        dimensions: { E: 1.4, A: 0.6 }
      },
      {
        label: "B",
        text: "DeepSeek写文字介绍，Canva自己做海报。AI帮内容，我负责设计。",
        score: 4,
        dimensions: { E: 2.8, A: 1.2 }
      },
      {
        label: "C",
        text: "DeepSeek了解节日信息、写文案 → Midjourney生成节日图片 → 我用Canva把文字和图片组合排版。工具各司其职。",
        score: 6,
        dimensions: { E: 4.2, A: 1.8 }
      },
      {
        label: "D",
        text: "DeepSeek分析目标受众、确定风格 → DeepSeek写初稿，我修改，核对资料 → Midjourney生成多张图，我选最合适的 → Canva设计，DeepSeek给排版建议，我调整细节 → 给朋友看，收集反馈 → DeepSeek帮我分析建议，我最终调整。每个环节选最合适的工具。",
        score: 5,
        dimensions: { E: 3.5, A: 1.5 }
      }
    ],
    correctAnswer: "C",
    maxScore: 6
  },
  {
    id: 16,
    section: "第三部分：AI技术应用",
    title: "人机协作沟通",
    content: '你和小组要做"垃圾分类"科学报告，决定用AI辅助。\n\n以下哪种协作方式最好？',
    options: [
      {
        label: "A",
        text: "大家一起讨论我们的观点和想要说的内容。然后分工：小明用AI查\"垃圾分类的意义\"，小红查\"如何分类\"，小刚查\"成功案例\"。收集完一起核对信息是否准确。我们自己写核心观点和结论，AI帮润色。AI检查语句和错误，我们审核逻辑。关键是观点必须是我们小组的，不能全靠AI。",
        score: 6,
        dimensions: { C: 4.2, A: 1.8 }
      },
      {
        label: "B",
        text: "一个人负责跟AI沟通，获取所有信息，然后分享给其他人。效率高，避免重复。",
        score: 2,
        dimensions: { C: 1.4, A: 0.6 }
      },
      {
        label: "C",
        text: "小明用AI查资料，小红用AI写报告，小刚用AI检查错误。分工明确，各做各的。",
        score: 3,
        dimensions: { C: 2.1, A: 0.9 }
      },
      {
        label: "D",
        text: "第一步小组讨论：我们想说什么？报告结构是什么？第二步分工协作：小明用AI查\"垃圾分类的意义\"，小红查\"如何分类\"，小刚查\"成功案例\"。第三步整合：大家把AI给的信息汇总，一起讨论，写出报告。",
        score: 5,
        dimensions: { C: 3.5, A: 1.5 }
      }
    ],
    correctAnswer: "A",
    maxScore: 6
  },
  {
    id: 17,
    section: "第三部分：AI技术应用",
    title: "获取准确信息的方法",
    content: '你想了解"中国的传统节日"，准备写介绍文章。\n\n以下哪种使用AI的方式最合适？',
    options: [
      {
        label: "A",
        text: "直接问豆包：\"请详细介绍中国的传统节日\"，把AI的答案整理成文章。效率高，AI知识全面。",
        score: 2,
        dimensions: { E: 1.4, R: 0.6 }
      },
      {
        label: "B",
        text: "分步骤问：\"中国有哪些重要传统节日？\"得到列表后，针对每个节日分别提问详细内容。这样信息更完整、有条理。",
        score: 4,
        dimensions: { E: 2.8, R: 1.2 }
      },
      {
        label: "C",
        text: "先让AI给出框架和基本信息，然后查课本和权威网站（如中国文化网）核对每个节日的内容。发现AI说错了就追问让它修正。既利用AI效率，又保证准确性。",
        score: 5,
        dimensions: { E: 3.5, R: 1.5 }
      },
      {
        label: "D",
        text: "让AI列出节日清单和关键信息点，作为研究框架。然后自己查《中国传统文化》等书籍、访问官方文化网站、甚至采访长辈，用多个来源的资料写文章。AI的答案只作参考，内容都要自己核实。写文章时标注资料来源（如\"据《中国节日大全》...\"），而不是写\"AI说...\"。",
        score: 6,
        dimensions: { E: 4.2, R: 1.8 }
      }
    ],
    correctAnswer: "D",
    maxScore: 6
  },
  {
    id: 18,
    section: "第三部分：AI技术应用",
    title: "AI适用场景判断",
    content: "你在用DeepSeek帮忙学习，以下4种情况，哪种做法最合理？\n\n1. 查知识：问\"光合作用的原理\" → AI回答后，你查课本核对\n2. 做习题：遇到难题问AI → AI直接给答案 → 你背下来\n3. 写作文：你写完作文 → AI帮你检查错别字和语句 → 你修改\n4. 做决定：周末补习数学还是英语 → AI帮你分析优缺点 → 你自己决定\n\n哪个判断是对的？",
    options: [
      {
        label: "A",
        text: "1和3做法对，2和4不对。查知识要核对，作文AI检查可以；但习题要自己思考，决定要自己做。",
        score: 4,
        dimensions: { A: 2.4, R: 1.6 }
      },
      {
        label: "B",
        text: "全部都对。AI就是用来帮忙的，这4种用法都合理。",
        score: 1,
        dimensions: { A: 0.6, R: 0.4 }
      },
      {
        label: "C",
        text: "1对（查知识核对），2不对（应该让AI讲思路不给答案），3对（AI检查），4对（AI分析，人决策）。关键是：AI辅助，人要保持思考和判断。",
        score: 6,
        dimensions: { A: 3.6, R: 2.4 }
      },
      {
        label: "D",
        text: "要看具体情况：①查知识可以用AI但必须验证；②做题AI只能讲思路，不能直接给答案；③作文AI可以帮检查，但核心内容要自己写；④做决定AI给信息，但选择必须自己做。总之，AI是助手，学习和判断的主体是你自己。",
        score: 5,
        dimensions: { A: 3.0, R: 2.0 }
      }
    ],
    correctAnswer: "C",
    maxScore: 6
  }
];

// 维度满分配置
export const DIMENSION_MAX = {
  E: 29.2,  // Engaging 工程力
  R: 29.4,  // Reflection 思辨力
  I: 22.8,  // Innovation 创新力
  C: 15.6,  // Communication 沟通力
  A: 21.6   // Application 协作力
};

// 计算分数
export const calculateScore = (answers: Record<number, string>) => {
  const dimensions = { E: 0, R: 0, I: 0, C: 0, A: 0 };
  let totalScore = 0;
  
  youngTestQuestions.forEach(question => {
    const answer = answers[question.id];
    if (answer) {
      const option = question.options.find(opt => opt.label === answer);
      if (option) {
        totalScore += option.score;
        Object.entries(option.dimensions).forEach(([dim, score]) => {
          dimensions[dim as keyof typeof dimensions] += score;
        });
      }
    }
  });
  
  // 标准化到20分制
  const normalizedDimensions = {
    E: (dimensions.E / DIMENSION_MAX.E) * 20,
    R: (dimensions.R / DIMENSION_MAX.R) * 20,
    I: (dimensions.I / DIMENSION_MAX.I) * 20,
    C: (dimensions.C / DIMENSION_MAX.C) * 20,
    A: (dimensions.A / DIMENSION_MAX.A) * 20
  };
  
  return {
    totalScore,
    dimensions: normalizedDimensions,
    rawDimensions: dimensions
  };
};

// 获取能力等级
export const getLevel = (score: number): { level: number; label: string; description: string } => {
  if (score >= 17) return { level: 5, label: "精通", description: "深度理解，能创新应用并建立体系" };
  if (score >= 13) return { level: 4, label: "熟练", description: "熟练使用，具备批判性思维和优化能力" };
  if (score >= 9) return { level: 3, label: "应用", description: "能基本使用AI解决问题，有初步判断" };
  if (score >= 5) return { level: 2, label: "了解", description: "知道AI能做什么，但缺乏实践和深度" };
  return { level: 1, label: "初识", description: "对AI的认知有明显误区或盲区" };
};
