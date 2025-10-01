import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Projects = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-foreground mb-6">AI项目</h1>
        <p className="text-muted-foreground">浏览和参与AI项目</p>
      </main>
      <Footer />
    </div>
  );
};

export default Projects;
