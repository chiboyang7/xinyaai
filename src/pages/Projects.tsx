import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ProjectsHero from "@/components/ProjectsHero";
import SimulationsGridAll from "@/components/SimulationsGridAll";
import { Separator } from "@/components/ui/separator";

const Projects = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <ProjectsHero />
      <main className="pt-8">
        <SimulationsGridAll />
      </main>
      <Footer />
    </div>
  );
};

export default Projects;
