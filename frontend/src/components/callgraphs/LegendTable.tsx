import { FC, ReactNode } from "react";
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
  setMsToHighlight?: (ms: string) => void;
  hintComponent?: ReactNode;
};

const LegendTable: FC<LegendTableType> = ({
  msColorsLegend,
  setMsToHighlight,
  hintComponent,
}) => {
  return (
    <div className="flex flex-row gap-5 max-h-[400px] overflow-y-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Microservice</TableHead>
            <TableHead>Color</TableHead>
            {setMsToHighlight && <TableHead>Highlight</TableHead>}
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
              {setMsToHighlight && (
                <TableCell className="cursor-pointer">
                  <Highlighter onClick={() => setMsToHighlight(name)} />
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex flex-col gap-5 items-center border-l-2 p-5">
        <h1>Hint</h1>
        {hintComponent}
      </div>
    </div>
  );
};

export default LegendTable;
