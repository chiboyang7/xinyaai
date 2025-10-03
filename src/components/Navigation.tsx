import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo2.png";

const Navigation = () => {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="CareerForge Logo" className="h-8 w-8" />
              <span className="font-bold text-xl">
                <span className="text-foreground text-2xl">新芽</span>
                <span className="text-primary text-2xl">AI</span>
              </span>
            </Link>
            
            <div className="hidden md:flex items-center gap-6">
              <Link to="/projects" className="text-base font-medium text-muted-foreground hover:text-primary transition-colors">
                AI项目挑战
              </Link>
              <Link to="/erica_model" className="text-base font-medium text-muted-foreground hover:text-primary transition-colors">
                AI能力模型
              </Link>
              
              <a href="https://case.xinyaai.com" className="text-base font-medium text-muted-foreground hover:text-primary transition-colors">
                学生作品
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" className="hidden sm:inline-flex text-base" asChild>
              <Link to="/auth">登录</Link>
            </Button>
            <Button className="text-base" asChild>
              <Link to="/auth">免费注册</Link>
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
