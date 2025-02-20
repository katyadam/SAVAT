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
import AnalysisInputButton from "./AnalysisInputButton";
import { AnalysisInput } from "@/api/inputs/types";
import { useMemo, useState } from "react";
import { CalendarArrowDown, CalendarArrowUp, Trash2 } from "lucide-react";
import { useAnalyisiInputDelete } from "@/hooks/useAnalysisInput";
import { useToast } from "@/hooks/use-toast";
import { Button } from "../ui/button";

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  projectId: string;
};

export function AnalysisInputsTable<TData, TValue>({
  columns,
  data,
  projectId,
}: DataTableProps<TData, TValue>) {
  const { mutateAsync } = useAnalyisiInputDelete(projectId);
  const { toast } = useToast();

  const handleOutputDelete = async (id: number) => {
    try {
      await mutateAsync(id);
      toast({
        title: "Analysis Input Removed!",
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

  const [sortByDate, setSortByDate] = useState<boolean>(false);
  const sortedData = useMemo<TData[]>(() => {
    return [...data].sort((a, b) => {
      const dateA = new Date((a as AnalysisInput).createdAt).getTime();
      const dateB = new Date((b as AnalysisInput).createdAt).getTime();
      return sortByDate ? dateA - dateB : dateB - dateA;
    });
  }, [data, sortByDate]);

  const microserviceFilter = (): boolean => false;
  const table = useReactTable({
    data: sortedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    filterFns: { microserviceFilter },
  });

  return (
    <div className="rounded-md border">
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
              <TableHead>Entities</TableHead>
              <TableHead>Graph</TableHead>
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
                  <AnalysisInputButton
                    type="entities"
                    id={(row.original as AnalysisInput).id}
                  />
                </TableCell>
                <TableCell>
                  <AnalysisInputButton
                    type="graph"
                    id={(row.original as AnalysisInput).id}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() =>
                      handleOutputDelete((row.original as AnalysisInput).id)
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
