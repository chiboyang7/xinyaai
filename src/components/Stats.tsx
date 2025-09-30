import { TrendingUp, Building2, Badge } from "lucide-react";

const stats = [
  {
    icon: TrendingUp,
    value: "10x",
    label: "利用AI以10倍的速度和思考深度完成日常任务",
  },
  {
    icon: Building2,
    value: "220+",
    label: "我们的用户覆盖了超过220所学校",
  },
  {
    icon: Badge,
    value: "100+",
    label: "超过100种AI技能勋章认证",
  },
];

const Stats = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-4xl font-bold text-foreground mb-2">
                  {stat.value}
                </div>
                <p className="text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stats;
