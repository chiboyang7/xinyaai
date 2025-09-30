import { Button } from "@/components/ui/button";
import { UserPlus, BookOpen, Award, Briefcase } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Register and tell us about yourself",
    description: "Create your free account and share your interests and career goals.",
  },
  {
    icon: BookOpen,
    title: "Complete real-world tasks",
    description: "Enroll in a job simulation and complete tasks that replicate actual work.",
  },
  {
    icon: Award,
    title: "Earn your certificate",
    description: "Compare your work with model answers and receive a certificate of completion.",
  },
  {
    icon: Briefcase,
    title: "Connect with recruiters",
    description: "Access curated resources and opportunities to connect with top employers.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">
            CareerForge is the bridge between education and career success
          </h2>
          <p className="text-lg text-muted-foreground">
            Our job simulations build real-life skills for real-life roles, offering a window into 
            the company and a preview of their day-to-day. Job sims are 100% free, open access and self-paced.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <div className="mb-2 text-sm font-semibold text-primary">
                  Step {index + 1}
                </div>
                <h3 className="font-semibold text-lg mb-2 text-foreground">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Button size="lg" className="gap-2">
            How CareerForge Works
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
