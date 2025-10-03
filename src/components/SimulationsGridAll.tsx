import SimulationCard from "./SimulationCard";
import { simulations } from "@/data/simulations";

const SimulationsGridAll = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {simulations.map((sim, index) => (
            <SimulationCard key={index} {...sim} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SimulationsGridAll;
