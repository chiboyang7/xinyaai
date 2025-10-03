import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SimulationsGridAll from "@/components/SimulationsGridAll";

const Projects = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">AI项目</h1>
          <p className="text-muted-foreground">浏览和参与AI项目</p>
        </div>
        <SimulationsGridAll />
      </main>
      <Footer />
    </div>
  );
};

export default Projects;
