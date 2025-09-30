import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroBackground from "@/assets/hero-background.jpg";

const Hero = () => {
  return (
    <section className="relative py-20 sm:py-32 overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-background/10 backdrop-blur-md rounded-2xl p-8 sm:p-12 border border-white/10">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-12">
              游戏化的学习方式 {"  "}
              <span className="text-primary">体验AI新职业</span>
            </h1>
            
            <p className="text-2xl sm:text-3xl font-medium mb-12">
              <span className="text-white">Experience Gamified Learning</span>
              {" "}
              <span className="text-primary">Explore AI Careers</span>
            </p>
            
            <p className="text-lg sm:text-xl text-white/90 mb-16 max-w-3xl mx-auto leading-relaxed">
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
      </div>
    </section>
  );
};

export default Hero;
