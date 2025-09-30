import { Button } from "@/components/ui/button";
import { UserPlus, BookOpen, Award, ClipboardCheck, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const steps = [
  {
    icon: UserPlus,
    title: "选择一个职位",
    description: "注册并选择加入一个正在热招的职位",
  },
  {
    icon: BookOpen,
    title: "按步骤完成任务",
    description: "大多数任务通常需要30分钟到6个小时",
  },
  {
    icon: ClipboardCheck,
    title: "专业评估",
    description: "我们的AI专家会对交付的任务进行评估",
  },
  {
    icon: Award,
    title: "获得技能奖章",
    description: "通过任务学习和掌握多个AI技能",
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
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
          <Button size="lg" className="gap-2 text-lg" asChild>
            <Link to="/auth">
              立刻加入新芽AI项目 
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
