import { Button } from "@/components/ui/button";
import { UserPlus, BookOpen, Award, Briefcase } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "注册并告诉我们关于你的信息",
    description: "创建免费账户，分享你的兴趣和职业目标。",
  },
  {
    icon: BookOpen,
    title: "完成真实工作任务",
    description: "参加工作模拟并完成复制实际工作的任务。",
  },
  {
    icon: Award,
    title: "获得证书",
    description: "将你的工作与标准答案对比，获得完成证书。",
  },
  {
    icon: Briefcase,
    title: "与招聘人员联系",
    description: "访问精选资源和机会，与顶级雇主建立联系。",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="text-foreground block">新芽AI模拟工作中真实的AI应用场景</span>
            <span className="text-primary block mt-2">以项目制的形式快速呈现结果</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <div className="mb-2 text-sm font-semibold text-primary">
                  Step {index + 1}
                </div>
                <h3 className="font-semibold text-lg mb-2 text-foreground">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Button size="lg" className="gap-2">
            How CareerForge Works
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
