"use client";

import * as React from "react";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import { CallGraphMethod } from "@/api/callgraphs/types";
import { useCallGraphLookup } from "@/context/CallGraphMethodLookupContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Filters } from "./Filters";
import { Pagination } from "./Pagination";
import { columns } from "./Columns";
import { ColumnsVisibility } from "./ColumnsVisibility";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

type MethodsTableType = {
  data: CallGraphMethod[];
  callGraphInputId: string;
};

export const MethodsTable: React.FC<MethodsTableType> = ({
  data,
  callGraphInputId,
}) => {
  const { callGraphLookupDispatch } = useCallGraphLookup();
  const navigate = useNavigate();

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [pageSize, setPageSize] = React.useState(5);

  const uniqueMicroservices = new Set(data.map((item) => item.microservice));
  const [selectedMicroservices, setSelectedMicroservices] =
    React.useState<Set<string>>(uniqueMicroservices);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    initialState: {
      pagination: {
        pageSize: pageSize,
      },
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    filterFns: {
      microserviceFilter: (row, columnId, filterValue) => {
        return filterValue.includes(row.getValue(columnId));
      },
    },
  });

  React.useEffect(() => {
    table
      .getColumn("microservice")
      ?.setFilterValue(Array.from(selectedMicroservices));
  }, [selectedMicroservices, table]);

  const toggleMicroserviceSelection = (microservice: string) => {
    setSelectedMicroservices((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(microservice)) {
        newSet.delete(microservice);
      } else {
        newSet.add(microservice);
      }
      return newSet;
    });
  };

  const handleMethodLookup = (methodId: string) => {
    callGraphLookupDispatch({ type: "LOOKUP_METHOD", payload: methodId });
    navigate(`/call-graph-input/${callGraphInputId}`);
  };

  return (
    <div className="w-full">
      <div className="flex flex-row items-center justify-between">
        <Filters
          uniqueMicroservices={uniqueMicroservices}
          selectedMicroservices={selectedMicroservices}
          toggleMicroserviceSelection={toggleMicroserviceSelection}
          onFilterByName={(value) =>
            table.getColumn("name")?.setFilterValue(value)
          }
        />
        <ColumnsVisibility columns={table.getAllColumns()} />
      </div>
      <div className="rounded-md border">
        <TooltipProvider>
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
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                    <TableCell>
                      <Button
                        onClick={() =>
                          handleMethodLookup(row.original.methodSignature)
                        }
                        variant="outline"
                      >
                        <Eye />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TooltipProvider>
      </div>
      <Pagination
        pageIndex={table.getState().pagination.pageIndex}
        pageCount={table.getPageCount()}
        pageSize={pageSize}
        onPageSizeChange={(value) => {
          setPageSize(value);
          table.setPageSize(value);
        }}
        onPreviousPage={() => table.previousPage()}
        onNextPage={() => table.nextPage()}
        canPreviousPage={table.getCanPreviousPage()}
        canNextPage={table.getCanNextPage()}
      />
    </div>
  );
};
