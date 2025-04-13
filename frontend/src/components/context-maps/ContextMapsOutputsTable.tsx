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
import { useMemo, useState } from "react";
import { CalendarArrowDown, CalendarArrowUp, Eye, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ConfirmWindow from "../ui/ConfirmWindow";
import { ContextMapOutputDto } from "@/api/context-maps/types";
import { Button } from "../ui/button";
import { useContextMapOutputDelete } from "@/hooks/useContextMapOutput";

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  projectId: string;
};

export function ContextMapsOutputsTable<TData, TValue>({
  columns,
  data,
  projectId,
}: DataTableProps<TData, TValue>) {
  const { mutateAsync } = useContextMapOutputDelete(projectId);
  const { toast } = useToast();
  const [contextMapOutputToDelete, setContextMapOutputToDelete] = useState<
    number | null
  >(null);

  const handleOutputDelete = async (id: number) => {
    try {
      await mutateAsync(id);
      toast({
        title: "Context Map Output Removed!",
      });
    } catch (error: unknown) {
      let errorMessage = "An unexpected error occurred";

      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      }

      toast({
        title: "Something BAD happened, couldn't delete context map output!",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const [sortByDate, setSortByDate] = useState<boolean>(false);
  const sortedData = useMemo<TData[]>(() => {
    return [...data].sort((a, b) => {
      const dateA = new Date((a as ContextMapOutputDto).createdAt).getTime();
      const dateB = new Date((b as ContextMapOutputDto).createdAt).getTime();
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
              <TableHead>Context Map</TableHead>
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
                    href={`/context-map-output/${
                      (row.original as ContextMapOutputDto).id
                    }/context-map`}
                  >
                    <Button variant="outline">
                      <Eye />
                    </Button>
                  </a>
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() =>
                      setContextMapOutputToDelete(
                        (row.original as ContextMapOutputDto).id
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
                No analysis outputs.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {contextMapOutputToDelete && (
        <ConfirmWindow
          closeFunc={() => setContextMapOutputToDelete(null)}
          title="Do you really want to delete this Change Impact Analysis Output ?"
          width="w-1/3"
          options={[
            {
              title: "YES",
              callback: () => {
                handleOutputDelete(contextMapOutputToDelete);
                setContextMapOutputToDelete(null);
              },
              btnVariant: "destructive",
            },
            {
              title: "NO",
              callback: () => setContextMapOutputToDelete(null),
              btnVariant: "ghost",
            },
          ]}
        />
      )}
    </div>
  );
}
