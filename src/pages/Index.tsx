import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import CompanyTicker from "@/components/CompanyTicker";
import SimulationsGrid from "@/components/SimulationsGrid";
import HowItWorks from "@/components/HowItWorks";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <CompanyTicker />
      <SimulationsGrid />
      <HowItWorks />
      <Stats />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Index;
