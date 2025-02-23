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
import { Eye, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { CallGraphInputSimple } from "@/api/callgraphs/types";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  useCallGraphInputDelete,
  useCallGraphInputSummary,
} from "@/hooks/useCallGraph";
import { useSortingByDate, useSortingByVersion } from "@/hooks/useTableSorting";
import HeaderWithSort from "../ui/HeaderWithSort";
import ConfirmWindow from "../ui/ConfirmWindow";

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

  const [inputToDelete, setInputToDelete] = useState<number | null>(null);
  const { data: inputSummary } = useCallGraphInputSummary(inputToDelete);
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

  const [sortBy, setSortBy] = useState<"version" | "date">("date");

  const { dateSortedData, dateSortMethod, setDateSortMethod } =
    useSortingByDate(data);
  const { versionSortedData, versionSortMethod, setVersionSortMethod } =
    useSortingByVersion(data);

  const table = useReactTable({
    data: sortBy === "date" ? dateSortedData : versionSortedData,
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
                header.id === "createdAt" || header.id === "version" ? (
                  <TableHead
                    key={header.id}
                    onClick={() => {
                      if (header.id === "createdAt") {
                        setSortBy("date");
                        setDateSortMethod(
                          dateSortMethod === "dateAsc" ? "dateDesc" : "dateAsc"
                        );
                      } else {
                        setSortBy("version");
                        setVersionSortMethod(
                          versionSortMethod === "versionAsc"
                            ? "versionDesc"
                            : "versionAsc"
                        );
                      }
                    }}
                    className="flex flex-row items-center gap-3 cursor-pointer"
                  >
                    <p>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </p>
                    <HeaderWithSort
                      header={header.id}
                      sortBy={sortBy}
                      sortMethod={
                        header.id === "createdAt"
                          ? dateSortMethod
                          : versionSortMethod
                      }
                    />
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
                      setInputToDelete(
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
                No Call Graph Inputs.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {inputToDelete && (
        <ConfirmWindow
          closeFunc={() => setInputToDelete(null)}
          title="Do you really want to delete this Call Graph Input ?"
          width="w-1/3"
          options={[
            {
              title: "YES",
              callback: () => {
                handleOutputDelete(inputToDelete);
                setInputToDelete(null);
              },
              btnVariant: "destructive",
            },
            {
              title: "NO",
              callback: () => setInputToDelete(null),
              btnVariant: "ghost",
            },
          ]}
          body={
            <div className="flex flex-col mb-5 items-start">
              <p>
                Usage in Change Impact Analysis Outputs:{" "}
                <span className="text-xl font-bold">
                  {inputSummary && inputSummary.totalCallGraphOutputs}
                </span>
              </p>
            </div>
          }
        />
      )}
    </div>
  );
}
