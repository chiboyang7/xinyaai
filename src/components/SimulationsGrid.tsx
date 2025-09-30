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
    imageUrl: "https://images.unsplash.com/photo-1590144662036-33bf0ebd2c7f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    hiringNow: true,
  },
  {
    company: "Bank of America",
    title: "Global Markets Sales and Trading Analyst",
    category: "Banking & Financial Services",
    duration: "3-4 hours",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    logoUrl: "https://cdn.theforage.com/vinternships/companyassets/fMCqmt8qR4G85Puue/J6Md4cccXnq7kokNB/1693127375175/boa_clr_logo_optimised.png",
    hiringNow: true,
  },
  {
    company: "Goldman Sachs",
    title: "Investment Banking Analyst",
    category: "Banking & Financial Services",
    duration: "5-6 hours",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    logoUrl: "https://cdn-assets.theforage.com/firm_logos/firm-logo-ticker-logos/v2/us_ca/goldman-sachs.svg",
    hiringNow: false,
  },
  {
    company: "Red Bull",
    title: "On-Premise Sales",
    category: "Sales",
    duration: "1-2 hours",
    imageUrl: "https://images.unsplash.com/photo-1556761175-b413da4baf72",
    logoUrl: "https://cdn.theforage.com/vinternships/companyassets/P2whMfgG9v48cqWwx/dpN7PmoeCuNXx6YCQ/1693114041548/RB_Standard_Logo_cmyk_2017_optimised.png",
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
