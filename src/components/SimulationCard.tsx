import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Layers } from "lucide-react";

interface SimulationCardProps {
  company: string;
  title: string;
  age: string;
  skills: string;
  imageUrl: string;
  logoUrl?: string;
  hiringNow?: boolean;
}

const SimulationCard = ({
  company,
  title,
  age,
  skills,
  imageUrl,
  logoUrl,
  hiringNow = false,
}: SimulationCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group border-border">
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
          {hiringNow ? "正在热招" : "等待解锁"}
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
            <Layers className="h-4 w-4" />
            <span>Age: {age}</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Skills: {skills}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SimulationCard;
