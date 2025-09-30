import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const EricaModel = () => {
  const dimensions = [
    {
      icon: "⚙️",
      name: "工程力",
      englishName: "Engineering",
      description: "对计算机技术的理解和应用能力，从基础概念到算法建模",
      careers: "软件工程师 / 算法工程师",
      color: "text-blue-600"
    },
    {
      icon: "🧠",
      name: "思辨力",
      englishName: "Reflection",
      description: "批判性地看待AI信息，并利用其进行深度分析、归纳和推理的能力",
      careers: "咨询顾问 / 工程师",
      color: "text-pink-600"
    },
    {
      icon: "🎨",
      name: "创造力",
      englishName: "Innovation",
      description: "与AI共同激发灵感，从0到1创造新颖、独特、富有想象力作品的能力",
      careers: "工业设计 / 艺术家",
      color: "text-orange-600"
    },
    {
      icon: "💬",
      name: "沟通力",
      englishName: "Communication",
      description: "与AI进行精准、高效、富有技巧的对话能力",
      careers: "记者 / 律师",
      color: "text-purple-600"
    },
    {
      icon: "🤝",
      name: "协作力",
      englishName: "Application",
      description: "将AI作为可赋能的伙伴，组织和驾驭它完成复杂工作",
      careers: "项目经理 / 创业者",
      color: "text-yellow-600"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-5xl mx-auto">
          <Card className="border bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border-b">
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
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
                      <TableHead className="w-[25%] font-semibold text-foreground">能力维度</TableHead>
                      <TableHead className="w-[45%] font-semibold text-foreground">解释说明</TableHead>
                      <TableHead className="w-[30%] font-semibold text-foreground">典型职业</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dimensions.map((dimension, index) => (
                      <TableRow key={index} className="hover:bg-muted/20">
                        <TableCell className="align-top">
                          <div className="flex items-start gap-2">
                            <span className="text-2xl">{dimension.icon}</span>
                            <div>
                              <div className="font-semibold text-foreground">{dimension.name}</div>
                              <div className={`text-sm ${dimension.color}`}>{dimension.englishName}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="align-top text-foreground/80">
                          {dimension.description}
                        </TableCell>
                        <TableCell className="align-top text-foreground/80">
                          {dimension.careers}
                        </TableCell>
                      </TableRow>
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
    </div>
  );
};

export default EricaModel;
