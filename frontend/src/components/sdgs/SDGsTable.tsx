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
import { useState } from "react";
import { Eye, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSortingByDate, useSortingByVersion } from "@/hooks/useTableSorting";
import HeaderWithSort from "../ui/HeaderWithSort";
import ConfirmWindow from "../ui/ConfirmWindow";
import { useSDGDelete, useSDGSummary } from "@/hooks/useSDG";
import { Button } from "../ui/button";
import { SDGDto } from "@/api/sdgs/types";

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  projectId: string;
};

export function SDGsTable<TData, TValue>({
  columns,
  data,
  projectId,
}: DataTableProps<TData, TValue>) {
  const { mutateAsync } = useSDGDelete(projectId);
  const { toast } = useToast();
  const [sdgToDelete, setSdgToDelete] = useState<number | null>(null);
  const { data: sdgSummary } = useSDGSummary(sdgToDelete);

  const handleOutputDelete = async (id: number) => {
    try {
      await mutateAsync(id);
      toast({
        title: "Service Dependecy Graph Removed!",
      });
    } catch (error: unknown) {
      let errorMessage = "An unexpected error occurred";

      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      }

      toast({
        title:
          "Something BAD happened, couldn't delete service dependency graph!",
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
                  <a href={`/sdg/${(row.original as SDGDto).id}`}>
                    <Button variant="outline">
                      <Eye />
                    </Button>
                  </a>
                </TableCell>

                <TableCell>
                  <Button
                    onClick={() => setSdgToDelete((row.original as SDGDto).id)}
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
                No service dependency graphs.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {sdgToDelete && (
        <ConfirmWindow
          closeFunc={() => setSdgToDelete(null)}
          title="Do you really want to delete this Service Dependency Graph ?"
          width="w-1/3"
          options={[
            {
              title: "YES",
              callback: () => {
                handleOutputDelete(sdgToDelete);
                setSdgToDelete(null);
              },
              btnVariant: "destructive",
            },
            {
              title: "NO",
              callback: () => setSdgToDelete(null),
              btnVariant: "ghost",
            },
          ]}
          body={
            <div className="flex flex-col mb-5 items-start">
              <p>
                Total compared service dependency graphs:{" "}
                <span className="text-xl font-bold">
                  {sdgSummary && sdgSummary.totalChangedSdgs}
                </span>
              </p>
            </div>
          }
        />
      )}
    </div>
  );
}
