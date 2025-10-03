import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ProjectsHero from "@/components/ProjectsHero";
import SimulationsGridAll from "@/components/SimulationsGridAll";

const Projects = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <ProjectsHero />
      <main className="py-12">
        <SimulationsGridAll />
      </main>
      <Footer />
    </div>
  );
};

export default Projects;
