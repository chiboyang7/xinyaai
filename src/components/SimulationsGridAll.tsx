import SimulationCard from "./SimulationCard";
import { simulations } from "@/data/simulations";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SimulationsGridAll = () => {
  const categories = [
    { value: "all", label: "全部" },
    { value: "科学竞赛", label: "科学竞赛" },
    { value: "艺术创作", label: "艺术创作" },
    { value: "AI智能体", label: "AI智能体" },
    { value: "综合素质", label: "综合素质" },
  ];

  const filterSimulations = (category: string) => {
    if (category === "all") return simulations;
    return simulations.filter((sim) => sim.badgeType === category);
  };

  return (
    <section className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-8 w-full justify-start">
            {categories.map((category) => (
              <TabsTrigger key={category.value} value={category.value}>
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category.value} value={category.value}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filterSimulations(category.value).map((sim, index) => (
                  <SimulationCard key={index} {...sim} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default SimulationsGridAll;
