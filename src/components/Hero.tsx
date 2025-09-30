import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative py-20 sm:py-32 bg-gradient-to-b from-secondary/30 to-background overflow-hidden">
      {/* Decorative curved dotted lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        {/* Top left curve */}
        <path
          d="M 0,100 Q 150,50 300,100"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          strokeDasharray="8 12"
          opacity="0.3"
        />
        
        {/* Top right curve */}
        <path
          d="M 900,50 Q 1100,100 1300,80"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          strokeDasharray="8 12"
          opacity="0.4"
          className="hidden sm:block"
        />
        
        {/* Middle left curve */}
        <path
          d="M -50,300 Q 100,250 200,320 T 400,350"
          fill="none"
          stroke="hsl(var(--secondary))"
          strokeWidth="2.5"
          strokeDasharray="10 15"
          opacity="0.25"
        />
        
        {/* Middle right curve */}
        <path
          d="M 1200,250 Q 1100,300 1000,280 T 800,320"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          strokeDasharray="6 10"
          opacity="0.35"
          className="hidden lg:block"
        />
        
        {/* Bottom curve */}
        <path
          d="M 200,500 Q 400,450 600,480 T 1000,520"
          fill="none"
          stroke="hsl(var(--secondary))"
          strokeWidth="2"
          strokeDasharray="8 12"
          opacity="0.2"
          className="hidden md:block"
        />
        
        {/* Accent small curve near content */}
        <path
          d="M 600,200 Q 700,180 800,200"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="3"
          strokeDasharray="5 8"
          opacity="0.5"
          className="hidden xl:block"
        />
      </svg>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-12">
            游戏化的学习方式 {"  "}
            <span className="text-primary">体验AI新职业</span>
          </h1>
          
          <p className="text-2xl sm:text-3xl font-medium mb-12">
            <span className="text-foreground">Experience Gamified Learning</span>
            {" "}
            <span className="text-primary">Explore AI Careers</span>
          </p>
          
          <p className="text-lg sm:text-xl text-muted-foreground mb-16 max-w-3xl mx-auto leading-relaxed">
            通过顶级企业设计的数十个AI职业和项目，在AI指导下<span className="text-primary">学习技能，激发潜力</span>
          </p>

          <Button size="lg" className="text-lg px-8 h-12 gap-2" asChild>
            <Link to="/auth">
              免费注册
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
