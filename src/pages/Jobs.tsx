import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Jobs = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-foreground mb-6">AI职业</h1>
        <p className="text-muted-foreground">探索AI相关的职业机会</p>
      </main>
      <Footer />
    </div>
  );
};

export default Jobs;
