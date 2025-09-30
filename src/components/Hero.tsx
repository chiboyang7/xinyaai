import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative py-20 sm:py-32 bg-gradient-to-b from-secondary/30 to-background overflow-hidden">
      {/* Decorative curved dotted lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dots1" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <rect width="4" height="4" fill="hsl(var(--primary))" opacity="0.4" />
          </pattern>
          <pattern id="dots2" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <rect width="4" height="4" fill="hsl(var(--primary))" opacity="0.25" />
          </pattern>
          <pattern id="dots3" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <rect width="4" height="4" fill="hsl(var(--secondary))" opacity="0.3" />
          </pattern>
        </defs>
        
        {/* Multiple curved wave patterns */}
        <path d="M0,150 Q300,100 600,150 T1200,150 L1200,200 Q900,180 600,200 T0,200 Z" fill="url(#dots1)" className="animate-pulse" style={{ animationDuration: '8s' }} />
        <path d="M0,250 Q400,200 800,250 T1600,250 L1600,300 Q1200,280 800,300 T0,300 Z" fill="url(#dots2)" className="animate-pulse" style={{ animationDuration: '10s' }} />
        <path d="M200,350 Q600,300 1000,350 T1800,350 L1800,400 Q1400,380 1000,400 T200,400 Z" fill="url(#dots3)" className="hidden sm:block animate-pulse" style={{ animationDuration: '12s' }} />
        
        {/* Additional decorative curved lines on the right */}
        <path d="M800,50 Q900,150 1000,250 Q1100,350 1200,450" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="8 12" fill="none" opacity="0.2" className="hidden lg:block" />
        <path d="M900,80 Q1000,180 1100,280 Q1200,380 1300,480" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="8 12" fill="none" opacity="0.15" className="hidden lg:block" />
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
