import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import JobsHero from "@/components/JobsHero";
import SimulationsGridAll from "@/components/SimulationsGridAll";

const Jobs = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <JobsHero />
      <SimulationsGridAll />
      <Footer />
    </div>
  );
};

export default Jobs;
