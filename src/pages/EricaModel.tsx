import React, { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronDown, ChevronUp, Settings, Brain, Palette, MessageSquare, Users, LucideIcon } from "lucide-react";

interface DetailLevel {
  score: string;
  level: string;
  behavior: string;
  example: string;
}

interface Dimension {
  icon: LucideIcon;
  name: string;
  englishName: string;
  description: string;
  careers:  string;
  color: string;
  details: DetailLevel[];
}

const EricaModel = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const dimensions: Dimension[] = [
    {
      icon: Settings,
      name: "工程力 E-Engineering",
      englishName: "",
      description: "对计算机技术的理解和应用能力，从基础概念到算法建模",
      careers: "软件工程师 / 算法工程师",
      color: "text-blue-600",
      details: [
        {
          score: "1分",
          level: "初识者",
          behavior: "理解基本的输入输出概念，知道AI需要输入信息才能给出回应。",
          example: "知道向ChatGPT输入问题，它会给出答案；理解「输入越详细，输出越准确」的基本规律。"
        },
        {
          score: "2分",
          level: "理解者",
          behavior: "对大语言模型有基本认知，理解AI的工作原理和局限性。",
          example: "知道AI是通过训练数据学习的，理解为什么AI有时会「胡编乱造」，懂得验证AI输出的重要性。"
        },
        {
          score: "3分",
          level: "应用者",
          behavior: "能够根据需求选择合适的AI工具，进行基础的产品设计思考。",
          example: "为制作校园宣传片选择合适的AI工具组合：用ChatGPT写脚本，用Midjourney生成配图，用剪映进行视频制作。"
        },
        {
          score: "4分",
          level: "架构者",
          behavior: "具备系统性思维，能设计多步骤的技术解决方案和工作流程。",
          example: "设计一个「智能学习助手」：输入学科→分析知识点→生成学习计划→推荐练习题→跟踪学习进度的完整系统架构。"
        },
        {
          score: "5分",
          level: "建模者",
          behavior: "具备算法思维，能将复杂问题抽象为数学模型，设计优化方案。",
          example: "将「如何安排最优课表」建模为约束优化问题：定义变量（时间、教室、老师），设置约束条件，寻找最优解。"
        }
      ]
    },
    {
      icon: Brain,
      name: "思辨力 R-Reflection",
      englishName: "",
      description: "批判性地看待AI信息，并利用其进行深度分析、归纳和推理的能力",
      careers: "咨询顾问 / 工程师",
      color: "text-blue-600",
      details: [
        {
          score: "1分",
          level: "接收者",
          behavior: "完全相信AI提供的信息，将其作为最终答案。",
          example: "AI说什么就是什么，直接复制粘贴。"
        },
        {
          score: "2分",
          level: "概括者",
          behavior: "能利用AI对文本或数据进行初步的归纳和总结，提炼表层信息。",
          example: "将一篇长文发给AI，让它生成摘要或关键词。"
        },
        {
          score: "3分",
          level: "分析员",
          behavior: "能引导AI对信息进行分类、比较和基础分析，开始提出自己的问题。",
          example: "输入两首唐诗，让AI比较它们的风格和情感异同，并提问「为什么李白的诗更大气？」。"
        },
        {
          score: "4分",
          level: "批判者",
          behavior: "对AI生成的结果持有审慎和质疑的态度，会有意识地进行交叉验证或提出挑战。",
          example: "当AI提供一个历史事件的日期时，会去搜索引擎或书中核实；会问AI「你这个观点的依据是什么？」。"
        },
        {
          score: "5分",
          level: "洞察者",
          behavior: "能够利用AI整合、分析复杂或多源的信息，从中发现隐藏的模式、趋势或提出独到的见解。",
          example: "将一周的家庭开销数据输入AI，让其分析消费结构，并从中发现「我们在外卖上的花费超出了预期」这一洞察。"
        }
      ]
    },
    {
      icon: Palette,
      name: "创造力 I-Innovation",
      englishName: "",
      description: "与AI共同激发灵感，从0到1创造新颖、独特、富有想象力作品的能力",
      careers: "工业设计 / 艺术家",
      color: "text-blue-600",
      details: [
        {
          score: "1分",
          level: "复现者",
          behavior: "能让AI生成或模仿非常常见、大众化的事物。",
          example: "输入「画一个苹果」、「写一首关于春天的诗」。"
        },
        {
          score: "2分",
          level: "组合者",
          behavior: "能将两个或以上不相关的、新奇的元素组合在一起，让AI生成有趣的作品。",
          example: "输入「画一只正在太空行走的、穿着宇航服的猫」，或「写一个关于机器人学习京剧的故事」。"
        },
        {
          score: "3分",
          level: "风格化者",
          behavior: "能引导AI以特定的艺术风格、情绪或媒介进行创作，作品开始具有辨识度。",
          example: "「用梵高的风格画一片向日葵花田」、「用悬疑电影的口吻写一个睡前故事」。"
        },
        {
          score: "4分",
          level: "创变者/伙伴",
          behavior: "将AI视为创作伙伴，通过多次迭代、碰撞和修改，共同创作出超越最初构想、充满个人印记的作品。",
          example: "先让AI生成一个概念草图，然后自己修改，再让AI基于修改稿进行深化，来回数轮，共同完成一幅复杂的画作。"
        },
        {
          score: "5分",
          level: "概念塑造者",
          behavior: "能够构思一个抽象的、深度的、全新的概念或主题，并引导AI将其视觉化或文本化，创作出具有独特内涵和艺术价值的作品。",
          example: "尝试让AI表现「时间的味道」、「孤独的颜色」等抽象概念，或创造一个全新的、有完整世界观的科幻种族。"
        }
      ]
    },
    {
      icon: MessageSquare,
      name: "沟通力 C-Communication",
      englishName: "",
      description: "与AI进行精准、高效、富有技巧的对话能力",
      careers: "记者 / 律师",
      color: "text-blue-600",
      details: [
        {
          score: "1分",
          level: "初识者",
          behavior: "能提出非常简单、孤立的问题（如「天空为什么是蓝色的？」）。指令模糊，常需要AI猜测意图。",
          example: "输入「猫」，期望AI能画画或写故事，但未提供任何上下文。"
        },
        {
          score: "2分",
          level: "提问者",
          behavior: "能提出包含明确主体的指令，完成单一、具体的任务。能进行简单的「一问一答」式追问。",
          example: "输入「画一只黑色的猫」，在AI生成后能追问「让它戴上帽子」。"
        },
        {
          score: "3分",
          level: "描述者",
          behavior: "能在一个指令中包含多个关键元素（如背景、目标、主体特征）。指令清晰、结构较为完整。",
          example: "输入「请帮我写一个关于一只勇敢小猫去森林里探险的故事大纲，需要包括三个主要情节。」"
        },
        {
          score: "4分",
          level: "引导者",
          behavior: "懂得运用高级技巧（如设定角色、明确格式、限定语气、提供反例）来引导AI，使其输出更符合复杂预期。",
          example: "输入「请你扮演一位资深科幻作家，用简洁、悬疑的风格，写一段关于AI拥有自我意识的开场白，不超过200字。」"
        },
        {
          score: "5分",
          level: "架构师",
          behavior: "能够设计结构化的指令链（Prompt Chain），预判AI的反应，通过多步引导，像导演一样让AI完成一个系统性的、连贯的复杂项目。",
          example: "第一步让AI生成故事角色设定，第二步基于角色生成大纲，第三步展开某一章节的细节描写，每一步都环环相扣。"
        }
      ]
    },
    {
      icon: Users,
      name: "协作力 A-Application",
      englishName: "",
      description: "将AI作为可赋能的伙伴，组织和驾驭它完成复杂工作",
      careers: "项目经理 / 创业者",
      color: "text-blue-600",
      details: [
        {
          score: "1分",
          level: "跟从者",
          behavior: "在固定的模板和流程中，能与AI完成简单的互动任务。",
          example: "在一个预设好的「故事接龙AI」中，能输入自己的句子并让AI接下去。"
        },
        {
          score: "2分",
          level: "参与者",
          behavior: "能与AI进行多轮对话，共同迭代和完善一个想法或作品。",
          example: "让AI生成一幅画后，能提出「把背景换成星空」、「让主角表情更开心」等具体修改意见，共同完成创作。"
        },
        {
          score: "3分",
          level: "组建者",
          behavior: "能将自己的碎片化知识教给AI，为AI构建一个基础的专属知识库，使其成为特定领域的帮手。",
          example: "将自己喜欢的10首古诗和作者信息「喂」给AI，然后让它扮演「古诗词问答机器人」。"
        },
        {
          score: "4分",
          level: "设计师",
          behavior: "能为特定用户设计一个有明确目标的AI工作流程。开始思考AI的「工作逻辑」。",
          example: "为喜欢做饭的妈妈设计一个「菜谱生成AI」，并设定好提问流程：「你今天想吃什么菜系？主要食材是什么？烹饪时间多久？」"
        },
        {
          score: "5分",
          level: "架构师/赋能者",
          behavior: "能设计并构建一个包含独特规则、结构化知识库和复杂逻辑的「AI智能体」，使其能自主、系统地完成任务。",
          example: "制作一个「AI面试官」，不仅能提问，还能根据预设的评分标准对回答进行初步判断和追问。"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-5xl mx-auto">
          <Card className="border bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border-b">
              <CardTitle className="text-3xl font-bold text-blue-600 mb-2">
                ERICA 能力评估标准
              </CardTitle>
              <CardDescription className="text-base text-foreground/70">
                ERICA AI Evaluation Model
              </CardDescription>
            </CardHeader>
            
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/30 hover:bg-muted/30">
                      <TableHead className="w-[30%] font-semibold text-foreground">能力维度</TableHead>
                      <TableHead className="w-[50%] font-semibold text-foreground">解释说明</TableHead>
                      <TableHead className="w-[20%] font-semibold text-foreground">典型职业</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dimensions.map((dimension, index) => (
                      <React.Fragment key={index}>
                        <TableRow
                          key={index} 
                          className="hover:bg-muted/20 cursor-pointer transition-colors"
                          onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                        >
                          <TableCell className="align-top">
                            <div className="flex items-center gap-3">
                              <dimension.icon className={`w-6 h-6 ${dimension.color}`} />
                              <div className="flex-1">
                              <div className="font-semibold">
                                <span className="text-foreground">{dimension.name.split(' ')[0]}</span>
                                <span className="hidden md:inline">
                                  {' '}
                                  <span className="text-blue-600">{dimension.name.split(' ')[1]}</span>
                                </span>
                              </div>
                              </div>
                              {expandedIndex === index ? (
                                <ChevronUp className="w-5 h-5 text-muted-foreground" />
                              ) : (
                                <ChevronDown className="w-5 h-5 text-muted-foreground" />
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="align-top text-foreground/80">
                            {dimension.description}
                          </TableCell>
                          <TableCell className="align-top text-foreground/80">
                            {dimension.careers}
                          </TableCell>
                        </TableRow>
                        {expandedIndex === index && (
                          <TableRow>
                            <TableCell colSpan={3} className="bg-muted/10 p-6">
                              <div className="space-y-4">
                                <h3 className="font-bold text-lg text-foreground mb-4">
                                  {dimension.name} - 详细评分标准
                                </h3>
                                <div className="overflow-x-auto">
                                  <table className="w-full border-collapse">
                                    <thead>
                                      <tr className="bg-muted/30">
                                        <th className="border border-border p-3 text-left font-semibold w-[10%]">评分</th>
                                        <th className="border border-border p-3 text-left font-semibold w-[15%]">能力层级</th>
                                        <th className="border border-border p-3 text-left font-semibold w-[35%]">行为表现</th>
                                        <th className="border border-border p-3 text-left font-semibold w-[40%]">典型例子</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {dimension.details.map((detail, detailIndex) => (
                                        <tr key={detailIndex} className="hover:bg-muted/20">
                                          <td className="border border-border p-3 font-medium">{detail.score}</td>
                                          <td className="border border-border p-3 font-medium">{detail.level}</td>
                                          <td className="border border-border p-3 text-foreground/80">{detail.behavior}</td>
                                          <td className="border border-border p-3 text-foreground/80">{detail.example}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                      </React.Fragment>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              * Erica模型受到美国专利法和中国软件著作法保护
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EricaModel;
