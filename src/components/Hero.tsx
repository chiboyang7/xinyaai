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
            <rect width="4" height="4" fill="hsl(var(--primary))" opacity="0.3" />
          </pattern>
          <pattern id="dots2" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <rect width="4" height="4" fill="hsl(var(--primary))" opacity="0.2" />
          </pattern>
          <pattern id="dots3" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <rect width="4" height="4" fill="hsl(var(--secondary))" opacity="0.25" />
          </pattern>
        </defs>
        
        {/* Lines behind text (50%) - subtle and centered */}
        <path d="M0,200 Q400,180 800,200 T1600,200 L1600,240 Q1200,230 800,240 T0,240 Z" fill="url(#dots2)" className="animate-pulse" style={{ animationDuration: '10s' }} />
        
        {/* Lines in empty space (50%) - more visible on sides and corners */}
        {/* Top right corner */}
        <path d="M600,50 Q800,80 1000,50 T1400,50 L1400,90 Q1200,75 1000,90 T600,90 Z" fill="url(#dots1)" className="hidden md:block animate-pulse" style={{ animationDuration: '8s' }} />
        
        {/* Top left curved line */}
        <path d="M0,80 Q100,100 200,80 T400,80" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="8 12" fill="none" opacity="0.3" className="hidden sm:block" />
        <path d="M0,120 Q120,145 240,120 T480,120" stroke="hsl(var(--secondary))" strokeWidth="2" strokeDasharray="6 10" fill="none" opacity="0.25" className="hidden sm:block" />
        
        {/* Bottom left corner */}
        <path d="M0,400 Q200,430 400,400 T800,400 L800,450 Q600,435 400,450 T0,450 Z" fill="url(#dots3)" className="hidden sm:block animate-pulse" style={{ animationDuration: '12s' }} />
        
        {/* Right side curved lines */}
        <path d="M900,100 Q1000,200 1100,300 Q1150,380 1200,460" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="8 12" fill="none" opacity="0.3" className="hidden lg:block" />
        <path d="M1000,80 Q1100,180 1200,280 Q1250,360 1300,440" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="8 12" fill="none" opacity="0.2" className="hidden xl:block" />
        
        {/* Bottom right corner */}
        <path d="M800,480 Q900,465 1000,480 T1200,480" stroke="hsl(var(--secondary))" strokeWidth="2" strokeDasharray="6 10" fill="none" opacity="0.3" className="hidden md:block" />
        
        {/* Additional bottom empty space lines (30%) */}
        <path d="M200,520 Q500,500 800,520 T1400,520 L1400,560 Q1100,545 800,560 T200,560 Z" fill="url(#dots1)" className="hidden sm:block animate-pulse" style={{ animationDuration: '9s' }} />
        <path d="M0,580 Q150,600 300,580 T600,580" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="8 12" fill="none" opacity="0.25" className="hidden md:block" />
        <path d="M400,600 Q550,615 700,600 T1000,600 Q1150,590 1300,600" stroke="hsl(var(--secondary))" strokeWidth="2" strokeDasharray="6 10" fill="none" opacity="0.3" className="hidden lg:block" />
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
