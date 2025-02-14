("use client");

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye } from "lucide-react";
import { Button } from "../ui/button";
import { CallGraphInputSimple } from "@/api/callgraphs/types";

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
};

export function CallGraphInputsTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const microserviceFilter = (): boolean => false;
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    filterFns: { microserviceFilter: microserviceFilter },
  });

  return (
    <div className="rounded-md border h-[500px] overflow-auto">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
              <TableHead>Call Graph</TableHead>
              <TableHead>Methods</TableHead>
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
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
                <TableCell>
                  <a
                    href={`/call-graph-input/${
                      (row.original as CallGraphInputSimple).id
                    }/call-graph`}
                  >
                    <Button variant="outline">
                      <Eye />
                    </Button>
                  </a>
                </TableCell>
                <TableCell>
                  <a
                    href={`/call-graph-input/${
                      (row.original as CallGraphInputSimple).id
                    }/methods`}
                  >
                    <Button variant="outline">
                      <Eye />
                    </Button>
                  </a>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length + 3}
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
}
