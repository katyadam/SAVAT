import { FC } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

type LegendTableType = {
  msColorsLegend: Map<string, string>;
};

const LegendTable: FC<LegendTableType> = ({ msColorsLegend }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Microservice</TableHead>
          <TableHead>Color</TableHead>
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
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default LegendTable;
