import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import JobsHero from "@/components/JobsHero";
import SimulationsGridAll from "@/components/SimulationsGridAll";
import { Separator } from "@/components/ui/separator";

const Jobs = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <JobsHero />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Separator className="opacity-30" />
      </div>
      <SimulationsGridAll />
      <Footer />
    </div>
  );
};

export default Jobs;
