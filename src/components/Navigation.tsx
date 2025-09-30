import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import logo from "@/assets/logo2.png";

const Navigation = () => {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <a href="/" className="flex items-center gap-2">
              <img src={logo} alt="CareerForge Logo" className="h-8 w-8" />
              <span className="font-bold text-xl text-foreground">CareerForge</span>
            </a>
            
            <div className="hidden md:flex items-center gap-6">
              <a href="#explore" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Explore
              </a>
              <a href="#jobs" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Jobs
              </a>
              <a href="#about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                About
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" className="hidden sm:inline-flex">
              Sign In
            </Button>
            <Button>
              Get Started
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
