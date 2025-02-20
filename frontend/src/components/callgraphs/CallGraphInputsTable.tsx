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
import { CalendarArrowDown, CalendarArrowUp, Eye, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { CallGraphInputSimple } from "@/api/callgraphs/types";
import { useMemo, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useCallGraphInputDelete } from "@/hooks/useCallGraph";

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  projectId: string;
};

export function CallGraphInputsTable<TData, TValue>({
  columns,
  data,
  projectId,
}: DataTableProps<TData, TValue>) {
  const { mutateAsync } = useCallGraphInputDelete(projectId);
  const { toast } = useToast();

  const handleOutputDelete = async (id: number) => {
    try {
      await mutateAsync(id);
      toast({
        title: "Call Graph Input Removed!",
      });
    } catch (error: unknown) {
      let errorMessage = "An unexpected error occurred";

      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      }

      toast({
        title: "Something BAD happened, couldn't delete call graph input!",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const microserviceFilter = (): boolean => false;

  const [sortByDate, setSortByDate] = useState<boolean>(false);
  const sortedData = useMemo<TData[]>(() => {
    return [...data].sort((a, b) => {
      const dateA = new Date((a as CallGraphInputSimple).createdAt).getTime();
      const dateB = new Date((b as CallGraphInputSimple).createdAt).getTime();
      return sortByDate ? dateA - dateB : dateB - dateA;
    });
  }, [data, sortByDate]);

  const table = useReactTable({
    data: sortedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    filterFns: { microserviceFilter: microserviceFilter },
  });
  return (
    <div className="rounded-md border max-h-[500px] overflow-auto">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) =>
                header.id === "createdAt" ? (
                  <TableHead
                    key={header.id}
                    onClick={() => setSortByDate(!sortByDate)}
                    className="flex flex-row items-center gap-3 cursor-pointer"
                  >
                    <p>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </p>
                    {sortByDate ? <CalendarArrowUp /> : <CalendarArrowDown />}
                  </TableHead>
                ) : (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                )
              )}
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
                <TableCell>
                  <Button
                    onClick={() =>
                      handleOutputDelete(
                        (row.original as CallGraphInputSimple).id
                      )
                    }
                    variant="outline"
                  >
                    <Trash2 className="text-red-500" />
                  </Button>
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
