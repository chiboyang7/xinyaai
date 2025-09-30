import SimulationCard from "./SimulationCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const simulations = [
  {
    company: "迪士尼乐园",
    title: "主题乐园设计师",
    category: "包含6个项目",
    duration: "约16个小时",
    imageUrl: "https://images.unsplash.com/photo-1590144662036-33bf0ebd2c7f",
    hiringNow: true,
  },
  {
    company: "美国花旗银行",
    title: "初级数据分析师",
    category: "包含3个项目",
    duration: "约3个小时",
    imageUrl: "https://images.unsplash.com/photo-1588600878108-578307a3cc9d",
    hiringNow: false,
  },
  {
    company: "索尼电影公司",
    title: "科幻小说作家",
    category: "包含6个项目",
    duration: "约6个小时",
    imageUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a",
    hiringNow: true,
  },
  {
    company: "可口可乐公司",
    title: "饮料销售经理",
    category: "包含4个项目",
    duration: "约3个小时",
    imageUrl: "https://images.unsplash.com/photo-1594971475674-6a97f8fe8c2b",
    hiringNow: true,
  },
];

const SimulationsGrid = () => {
  return (
    <section className="py-20" id="explore">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
          <span className="text-black">申请加入我们的</span>
          <span className="text-primary">热招AI职位</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {simulations.map((sim, index) => (
            <SimulationCard key={index} {...sim} />
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg" className="gap-2 text-lg" asChild>
            <Link to="/jobs">
              发现更多的AI职位
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SimulationsGrid;
