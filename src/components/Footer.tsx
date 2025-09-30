import { Link } from "react-router-dom";
import logo from "@/assets/logo2.png";

const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
       

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 新芽AI版权所有.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="CareerForge Logo" className="h-8 w-8" />
              <span className="font-bold text-xl">
                <span className="text-foreground text-2xl">新芽</span>
                <span className="text-primary text-2xl">AI</span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
