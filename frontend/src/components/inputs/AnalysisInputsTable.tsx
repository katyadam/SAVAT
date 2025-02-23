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
import { useState } from "react";
import { Trash2 } from "lucide-react";
import {
  useAnalyisiInputDelete,
  useAnalysisInputSummary,
} from "@/hooks/useAnalysisInput";
import { useToast } from "@/hooks/use-toast";
import { Button } from "../ui/button";
import { useSortingByDate, useSortingByVersion } from "@/hooks/useTableSorting";
import HeaderWithSort from "../ui/HeaderWithSort";
import ConfirmWindow from "../ui/ConfirmWindow";

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
  const [inputToDelete, setInputToDelete] = useState<number | null>(null);
  const { data: inputSummary } = useAnalysisInputSummary(inputToDelete);

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

  const [sortBy, setSortBy] = useState<"version" | "date">("date");

  const { dateSortedData, dateSortMethod, setDateSortMethod } =
    useSortingByDate(data);
  const { versionSortedData, versionSortMethod, setVersionSortMethod } =
    useSortingByVersion(data);

  const microserviceFilter = (): boolean => false;
  const table = useReactTable({
    data: sortBy === "date" ? dateSortedData : versionSortedData,
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
                      setInputToDelete((row.original as AnalysisInput).id)
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
      {inputToDelete && (
        <ConfirmWindow
          closeFunc={() => setInputToDelete(null)}
          title="Do you really want to delete this Analysis Input ?"
          width="w-1/4"
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
            <div>
              <p className="m-5">
                Compared Entities:{" "}
                <span className="text-xl font-bold">
                  {inputSummary && inputSummary.totalEntitiesComparisons}
                </span>
              </p>
              <p className="m-5">
                Compared Graphs:{" "}
                <span className="text-xl font-bold">
                  {inputSummary && inputSummary.totalGraphComparisons}
                </span>
              </p>
            </div>
          }
        />
      )}
    </div>
  );
}
