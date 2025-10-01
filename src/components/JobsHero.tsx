import { Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const JobsHero = () => {
  return (
    <section className="relative py-12 sm:py-20 bg-gradient-to-b from-primary/10 to-background overflow-hidden">
      {/* Decorative patterns */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="jobs-dots1" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <rect width="4" height="4" fill="hsl(var(--primary))" opacity="0.3" />
          </pattern>
          <pattern id="jobs-dots2" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <rect width="4" height="4" fill="hsl(var(--secondary))" opacity="0.25" />
          </pattern>
        </defs>
        
        {/* Left curves */}
        <path d="M50,150 Q100,200 150,250" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="8 12" fill="none" opacity="0.2" className="hidden lg:block" />
        <path d="M80,170 Q120,220 160,270" stroke="hsl(var(--secondary))" strokeWidth="2" strokeDasharray="8 12" fill="none" opacity="0.15" className="hidden lg:block" />
        
        {/* Right curves */}
        <path d="M1200,150 Q1150,200 1100,250" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="8 12" fill="none" opacity="0.2" className="hidden lg:block" />
        <path d="M1170,170 Q1130,220 1090,270" stroke="hsl(var(--secondary))" strokeWidth="2" strokeDasharray="8 12" fill="none" opacity="0.15" className="hidden lg:block" />
        
        {/* Wave patterns */}
        <path d="M0,200 Q400,180 800,200 T1600,200 L1600,240 Q1200,220 800,240 T0,240 Z" fill="url(#jobs-dots1)" className="animate-pulse" style={{ animationDuration: '10s' }} />
        <path d="M200,280 Q500,260 800,280 T1400,280 L1400,320 Q1100,300 800,320 T200,320 Z" fill="url(#jobs-dots2)" className="animate-pulse" style={{ animationDuration: '11s' }} />
      </svg>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4">
            找到你的<span className="text-primary">AI职业起点</span>
          </h1>
          
         
        </div>
      </div>
    </section>
  );
};

export default JobsHero;
