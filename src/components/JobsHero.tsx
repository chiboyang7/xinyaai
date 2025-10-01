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
          
          <p className="text-base sm:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            从220+顶级企业的真实项目中，选择最适合你的AI职业方向
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="搜索职位、公司、技能..."
              className="pl-12 h-12 text-base bg-background/80 backdrop-blur-sm border-primary/20 focus:border-primary"
            />
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            <Badge variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors px-4 py-1.5">
              正在热招
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors px-4 py-1.5">
              实习
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors px-4 py-1.5">
              全职
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors px-4 py-1.5">
              远程
            </Badge>
          </div>

          {/* Stats Bar */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🎯</span>
              <span className="text-muted-foreground">45个职位</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🏢</span>
              <span className="text-muted-foreground">220+企业</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">⚡</span>
              <span className="text-muted-foreground">10个热招</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobsHero;
