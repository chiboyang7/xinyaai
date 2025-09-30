import { Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-semibold mb-4 text-foreground">For Students</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">All Job Simulations</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Software Engineering</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Consulting</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Banking & Finance</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Student Blog</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground">For Enterprise</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Sign In</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Enterprise Resources</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Request a Demo</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground">About Us</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Careers</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">FAQs</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Notice</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms of Use</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Sitemap</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 CareerForge, Inc. All rights reserved.
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
