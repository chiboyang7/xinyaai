import SimulationCard from "./SimulationCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { simulations } from "@/data/simulations";

const SimulationsGrid = () => {
  return (
    <section className="py-20" id="explore">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
          <span className="text-black">申请加入我们的</span>
          <span className="text-primary">AI项目挑战</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {simulations.map((sim, index) => (
            <SimulationCard key={index} {...sim} />
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg" className="gap-2 text-lg" asChild>
            <Link to="/projects">
              发现更多的AI项目
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SimulationsGrid;
