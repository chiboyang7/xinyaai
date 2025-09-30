import { TableCell, TableRow } from "@/components/ui/table";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Dimension } from "@/data/evaluationDimensions";

interface DimensionRowProps {
  dimension: Dimension;
  isExpanded: boolean;
  onToggle: () => void;
}

export const DimensionRow = ({ dimension, isExpanded, onToggle }: DimensionRowProps) => {
  return (
    <TableRow
      onClick={onToggle}
      className="cursor-pointer hover:bg-muted/50 transition-colors"
    >
      <TableCell className="font-medium">
        <div className="flex items-center gap-2">
          {isExpanded ? (
            <ChevronDown className="h-4 w-4 text-primary" />
          ) : (
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          )}
          <span className="text-foreground">{dimension.name}</span>
        </div>
      </TableCell>
      <TableCell className="text-muted-foreground">
        {dimension.description}
      </TableCell>
      <TableCell className="text-left">
        <div className="flex flex-wrap gap-1">
          {dimension.careers.slice(0, 2).map((career, idx) => (
            <span
              key={idx}
              className="text-xs bg-primary/10 text-primary px-2 py-1 rounded"
            >
              {career}
            </span>
          ))}
          {dimension.careers.length > 2 && (
            <span className="text-xs text-muted-foreground">
              +{dimension.careers.length - 2}
            </span>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
};
