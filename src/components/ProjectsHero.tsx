const ProjectsHero = () => {
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
        
        {/* Side decorative curved lines - balanced left and right */}
        {/* Left side curves */}
        <path d="M50,300 Q120,380 190,460 Q260,540 330,620" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="8 12" fill="none" opacity="0.2" className="hidden lg:block" />
        <path d="M100,320 Q160,400 220,480 Q280,560 340,640" stroke="hsl(var(--secondary))" strokeWidth="2" strokeDasharray="8 12" fill="none" opacity="0.15" className="hidden lg:block" />
        
        {/* Right side curves */}
        <path d="M1200,300 Q1130,380 1060,460 Q990,540 920,620" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="8 12" fill="none" opacity="0.2" className="hidden lg:block" />
        <path d="M1150,320 Q1090,400 1030,480 Q970,560 910,640" stroke="hsl(var(--secondary))" strokeWidth="2" strokeDasharray="8 12" fill="none" opacity="0.15" className="hidden lg:block" />
        <path d="M1250,280 Q1180,360 1110,440 Q1040,520 970,600" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="8 12" fill="none" opacity="0.18" className="hidden lg:block" />
        
        {/* Random scattered dots across the hero */}
        <circle cx="150" cy="100" r="3" fill="hsl(var(--primary))" opacity="0.3" />
        <circle cx="250" cy="180" r="2" fill="hsl(var(--secondary))" opacity="0.4" />
        <circle cx="350" cy="120" r="3" fill="hsl(var(--primary))" opacity="0.25" />
        <circle cx="450" cy="220" r="2" fill="hsl(var(--primary))" opacity="0.35" />
        <circle cx="550" cy="150" r="3" fill="hsl(var(--secondary))" opacity="0.3" />
        <circle cx="650" cy="200" r="2" fill="hsl(var(--primary))" opacity="0.4" />
        <circle cx="750" cy="130" r="3" fill="hsl(var(--primary))" opacity="0.3" />
        <circle cx="850" cy="190" r="2" fill="hsl(var(--secondary))" opacity="0.35" />
        <circle cx="950" cy="140" r="3" fill="hsl(var(--primary))" opacity="0.25" />
        <circle cx="1050" cy="210" r="2" fill="hsl(var(--primary))" opacity="0.4" />
        <circle cx="1150" cy="160" r="3" fill="hsl(var(--secondary))" opacity="0.3" />
        <circle cx="1250" cy="230" r="2" fill="hsl(var(--primary))" opacity="0.35" />
        
        <circle cx="200" cy="280" r="2" fill="hsl(var(--primary))" opacity="0.3" />
        <circle cx="400" cy="320" r="3" fill="hsl(var(--secondary))" opacity="0.25" />
        <circle cx="600" cy="290" r="2" fill="hsl(var(--primary))" opacity="0.4" />
        <circle cx="800" cy="340" r="3" fill="hsl(var(--primary))" opacity="0.3" />
        <circle cx="1000" cy="310" r="2" fill="hsl(var(--secondary))" opacity="0.35" />
        <circle cx="1200" cy="350" r="3" fill="hsl(var(--primary))" opacity="0.25" />
        
        <circle cx="180" cy="420" r="3" fill="hsl(var(--primary))" opacity="0.35" />
        <circle cx="380" cy="460" r="2" fill="hsl(var(--secondary))" opacity="0.3" />
        <circle cx="580" cy="430" r="3" fill="hsl(var(--primary))" opacity="0.25" />
        <circle cx="780" cy="480" r="2" fill="hsl(var(--primary))" opacity="0.4" />
        <circle cx="980" cy="450" r="3" fill="hsl(var(--secondary))" opacity="0.3" />
        <circle cx="1180" cy="490" r="2" fill="hsl(var(--primary))" opacity="0.35" />
        
        {/* Middle section wave patterns */}
        <path d="M0,350 Q400,320 800,350 T1600,350 L1600,400 Q1200,380 800,400 T0,400 Z" fill="url(#dots2)" className="animate-pulse" style={{ animationDuration: '10s' }} />
        
        {/* Bottom section decorative lines */}
        <path d="M0,480 Q350,450 700,480 T1400,480 L1400,530 Q1050,510 700,530 T0,530 Z" fill="url(#dots2)" className="animate-pulse" style={{ animationDuration: '9s' }} />
        <path d="M200,550 Q500,520 800,550 T1400,550 L1400,600 Q1100,580 800,600 T200,600 Z" fill="url(#dots3)" className="hidden sm:block animate-pulse" style={{ animationDuration: '11s' }} />
      </svg>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-12">
            探索AI项目 {" "}
            <span className="text-primary">{" "}挑战真实场景</span>
          </h1>
          
          <p className="text-2xl sm:text-3xl font-medium mb-12">
            <span className="text-foreground">Explore AI Projects  </span>
            {" "}
            <span className="text-primary">{" "}Build Real Solutions</span>
          </p>
          
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            参与知名企业的AI项目挑战，<span className="text-primary">实践应用，提升能力</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProjectsHero;
