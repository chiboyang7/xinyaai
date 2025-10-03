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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Separator className="my-12" />
      </div>
      <main className="py-12">
        <SimulationsGridAll />
      </main>
      <Footer />
    </div>
  );
};

export default Projects;
