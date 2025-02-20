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
} from "../ui/table";
import { CallGraphOutputSimple } from "@/api/callgraphs/types";
import { Button } from "../ui/button";
import { CalendarArrowDown, CalendarArrowUp, Eye, Trash2 } from "lucide-react";
import { useCallGraphOutputDelete } from "@/hooks/useCallGraphOutput";
import { useToast } from "@/hooks/use-toast";
import { useMemo, useState } from "react";

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  projectId: string;
};

export function CallGraphOutputsTable<TData, TValue>({
  columns,
  data,
  projectId,
}: DataTableProps<TData, TValue>) {
  const { mutateAsync } = useCallGraphOutputDelete(projectId);
  const { toast } = useToast();

  const handleOutputDelete = async (id: number) => {
    try {
      await mutateAsync(id);
      toast({
        title: "Analysis Output Removed!",
      });
    } catch (error: unknown) {
      let errorMessage = "An unexpected error occurred";

      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      }

      toast({
        title: "Something BAD happened, couldn't delete analysis input!",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const [sortByDate, setSortByDate] = useState<boolean>(false);
  const sortedData = useMemo<TData[]>(() => {
    return [...data].sort((a, b) => {
      const dateA = new Date((a as CallGraphOutputSimple).createdAt).getTime();
      const dateB = new Date((b as CallGraphOutputSimple).createdAt).getTime();
      return sortByDate ? dateA - dateB : dateB - dateA;
    });
  }, [data, sortByDate]);
  const microserviceFilter = (): boolean => false;
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
                    href={`/call-graph-output/${
                      (row.original as CallGraphOutputSimple).id
                    }/call-graph`}
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
                        (row.original as CallGraphOutputSimple).id
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
