import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dimension } from "@/data/evaluationDimensions";

interface DimensionDetailProps {
  dimension: Dimension;
  onClose: () => void;
}

export const DimensionDetail = ({ dimension }: DimensionDetailProps) => {
  return (
    <TableRow className="bg-muted/30 hover:bg-muted/30">
      <TableCell colSpan={3} className="p-6">
        <div className="space-y-4">
          {/* All Careers */}
          <div>
            <h4 className="font-semibold text-sm text-foreground mb-2">
              相关职业方向
            </h4>
            <div className="flex flex-wrap gap-2">
              {dimension.careers.map((career, idx) => (
                <Badge key={idx} variant="secondary" className="bg-primary/10 text-primary">
                  {career}
                </Badge>
              ))}
            </div>
          </div>

          {/* Skills */}
          {dimension.details?.skills && (
            <div>
              <h4 className="font-semibold text-sm text-foreground mb-2">
                核心技能
              </h4>
              <div className="flex flex-wrap gap-2">
                {dimension.details.skills.map((skill, idx) => (
                  <Badge key={idx} variant="outline">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Examples */}
          {dimension.details?.examples && (
            <div>
              <h4 className="font-semibold text-sm text-foreground mb-2">
                典型应用场景
              </h4>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                {dimension.details.examples.map((example, idx) => (
                  <li key={idx}>{example}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
};
