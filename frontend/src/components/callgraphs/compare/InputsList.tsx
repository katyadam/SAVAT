import { useProjectCallGraphInputs } from "@/hooks/useCallGraph";
import { FC } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { CallGraphInputSimple } from "@/api/callgraphs/types";

type InputsListType = {
  projectId: string;
  inputsToOmit: Set<number>;
};

const InputsList: FC<InputsListType> = ({ projectId, inputsToOmit }) => {
  const { data: callGraphInputs, isLoading } =
    useProjectCallGraphInputs(projectId);

  if (!callGraphInputs || isLoading) {
    return <p>Wait for analysis inputs to load...</p>;
  }

  const columns: ColumnDef<CallGraphInputSimple>[] = [
    {
      header: "Commit Hash",
      accessorKey: "commitHash",
    },
    {
      header: "ID",
      accessorKey: "id",
    },
  ];

  const microserviceFilter = (): boolean => false;
  const table = useReactTable({
    data: callGraphInputs.filter((input) => !inputsToOmit.has(input.id)),
    columns,
    getCoreRowModel: getCoreRowModel(),
    filterFns: { microserviceFilter: microserviceFilter },
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length + 1}
                className="h-24 text-center"
              >
                No analysis inputs.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default InputsList;
