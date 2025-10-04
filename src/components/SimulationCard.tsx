import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SimulationCardProps {
  company: string;
  title: string;
  category: string;
  duration: string;
  imageUrl: string;
  logoUrl?: string;
  hiringNow?: boolean;
  link?: string;
}

const SimulationCard = ({
  company,
  title,
  category,
  duration,
  imageUrl,
  logoUrl,
  hiringNow = false,
  link,
}: SimulationCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (hiringNow && link) {
      navigate(link);
    }
  };

  return (
    <Card 
      onClick={handleClick}
      className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group border-border"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <Badge className={`absolute top-3 left-3 ${
          hiringNow 
            ? "bg-primary text-primary-foreground hover:bg-primary" 
            : "bg-orange-500 text-white hover:bg-orange-500"
        }`}>
          {hiringNow ? "开放挑战" : "等待解锁"}
        </Badge>
      </div>
      
      <CardContent className="p-6">
        <div className="flex items-start gap-3 mb-4">
          {logoUrl && (
            <img
              src={logoUrl}
              alt={company}
              className="h-10 w-10 object-contain"
            />
          )}
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground mb-1">{company}</p>
            <h3 className="font-semibold text-lg text-foreground leading-tight">
              {title}
            </h3>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <User className="h-4 w-4" />
            <span>{category}</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Award className="h-4 w-4" />
            <span>{duration}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SimulationCard;
