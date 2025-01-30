import { FC } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Highlighter } from "lucide-react";

type LegendTableType = {
  msColorsLegend: Map<string, string>;
  setMsToHighlight: (ms: string) => void;
};

const LegendTable: FC<LegendTableType> = ({
  msColorsLegend,
  setMsToHighlight,
}) => {
  return (
    <div className="max-h-[400px] overflow-y-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Microservice</TableHead>
            <TableHead>Color</TableHead>
            <TableHead>Highlight</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from(msColorsLegend.entries()).map(([name, color]) => (
            <TableRow key={name}>
              <TableCell>{name}</TableCell>
              <TableCell className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded-full border border-gray-300"
                  style={{ backgroundColor: color }}
                />
                {color}
              </TableCell>
              <TableCell className="cursor-pointer">
                <Highlighter onClick={() => setMsToHighlight(name)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default LegendTable;
