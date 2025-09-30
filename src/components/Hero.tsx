import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative py-20 sm:py-32 bg-gradient-to-b from-secondary/30 to-background overflow-hidden">
      {/* Decorative curved dotted lines - positioned in empty spaces */}
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
        
        {/* Top right corner waves */}
        <path d="M800,20 Q1000,60 1200,40 T1600,60 L1600,110 Q1400,90 1200,100 T800,80 Z" fill="url(#dots1)" className="hidden md:block animate-pulse" style={{ animationDuration: '8s' }} />
        <path d="M900,100 Q1100,140 1300,120 T1700,140 L1700,180 Q1500,160 1300,170 T900,150 Z" fill="url(#dots2)" className="hidden lg:block animate-pulse" style={{ animationDuration: '10s' }} />
        
        {/* Bottom left corner waves */}
        <path d="M0,400 Q200,450 400,420 T800,450 L800,500 Q600,480 400,490 T0,480 Z" fill="url(#dots3)" className="hidden sm:block animate-pulse" style={{ animationDuration: '12s' }} />
        <path d="M0,520 Q150,560 300,540 T600,570 L600,610 Q450,590 300,600 T0,590 Z" fill="url(#dots1)" className="hidden md:block animate-pulse" style={{ animationDuration: '9s' }} />
        
        {/* Curved lines on sides */}
        <path d="M50,150 Q150,200 100,300 T150,500" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="8 12" fill="none" opacity="0.2" className="hidden lg:block" />
        <path d="M1350,150 Q1400,250 1380,350 T1400,500" stroke="hsl(var(--secondary))" strokeWidth="2" strokeDasharray="8 12" fill="none" opacity="0.2" className="hidden xl:block" />
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
