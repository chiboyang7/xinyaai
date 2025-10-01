import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import JobsHero from "@/components/JobsHero";

const Jobs = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <JobsHero />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Job cards will go here */}
      </main>
      <Footer />
    </div>
  );
};

export default Jobs;
