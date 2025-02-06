"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, X, ClipboardCopy, Eye } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FC } from "react";
import { toast } from "@/hooks/use-toast";
import { useCallGraphLookup } from "@/context/CallGraphMethodLookupContext";
import { useNavigate } from "react-router-dom";
import { CallGraphMethod } from "@/api/callgraphs/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

declare module "@tanstack/react-table" {
  interface FilterFns {
    microserviceFilter: FilterFn<CallGraphMethod>;
  }
}

export const columns: ColumnDef<CallGraphMethod>[] = [
  {
    accessorKey: "returnType",
    header: "Return Type",
    cell: ({ row }) => (
      <Tooltip>
        <TooltipTrigger>
          {(row.getValue("returnType") as string).split(".").pop()}
        </TooltipTrigger>
        <TooltipContent>
          <p>{row.getValue("returnType") as string}</p>
        </TooltipContent>
      </Tooltip>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "parameters",
    header: "Method Arguments",
    cell: ({ row }) => {
      const parameters = row.getValue("parameters") as string[]; // Cast to string[]
      return (
        <div>
          {parameters.map((param, index) => (
            <p>
              <Tooltip key={index}>
                <TooltipTrigger>{param.split(".").pop()}</TooltipTrigger>
                <TooltipContent>
                  <p>{param}</p>
                </TooltipContent>
              </Tooltip>
            </p>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "bytecodeHash",
    header: "Bytecode Hash",
    cell: ({ row }) => (
      <div className="flex items-center">
        {row.getValue<string>("bytecodeHash") === "null" ? (
          "Abstract method !"
        ) : (
          <>
            {`${row.getValue<string>("bytecodeHash").slice(0, 5)}...${row
              .getValue<string>("bytecodeHash")
              .slice(-5)}`}
            <Button
              variant="link"
              onClick={() => {
                toast({
                  title: "Copied!",
                  description: (
                    <div className="max-w-xs break-words">
                      {row.getValue("bytecodeHash")}
                    </div>
                  ),
                });
                navigator.clipboard.writeText(row.getValue("bytecodeHash"));
              }}
            >
              <ClipboardCopy />
            </Button>
          </>
        )}
      </div>
    ),
  },
  {
    accessorKey: "type",
    header: "Parent Class",
    cell: ({ row }) => (
      <Tooltip>
        <TooltipTrigger>
          {(row.getValue("type") as string).split(".").pop()}
        </TooltipTrigger>
        <TooltipContent>
          <p>{row.getValue("type") as string}</p>
        </TooltipContent>
      </Tooltip>
    ),
  },
  {
    accessorKey: "microservice",
    header: "Microservice",
    cell: ({ row }) => <div>{row.getValue("microservice")}</div>,
    filterFn: "microserviceFilter",
  },
  {
    accessorKey: "httpMethod",
    header: "HTTP Method",
    cell: ({ row }) => <div>{row.getValue("httpMethod") as string}</div>,
  },
];

type MethodsTableType = {
  data: CallGraphMethod[];
  callGraphInputId: string;
};

const MethodsTable: FC<MethodsTableType> = ({ data, callGraphInputId }) => {
  const [isFilterMsOpen, setIsFilterMsOpen] = React.useState(false);
  const [isFilterCollsOpen, setIsFilterCollsOpen] = React.useState(false);
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
      <div className="flex items-center py-4 gap-5">
        <Input
          placeholder="Filter methods by their names..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu
          modal={false}
          open={isFilterMsOpen}
          onOpenChange={setIsFilterMsOpen}
        >
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Filter by Microservices {isFilterMsOpen ? <X /> : <ChevronDown />}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {Array.from(uniqueMicroservices).map((service) => (
              <DropdownMenuCheckboxItem
                key={service}
                checked={selectedMicroservices.has(service)}
                onCheckedChange={() => toggleMicroserviceSelection(service)}
                onSelect={(e) => e.preventDefault()}
              >
                {service}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu
          modal={false}
          open={isFilterCollsOpen}
          onOpenChange={setIsFilterCollsOpen}
        >
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Columns {isFilterCollsOpen ? <X /> : <ChevronDown />}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  onSelect={(e) => e.preventDefault()}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
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
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
          <div>
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <div className="flex flex-col items-center gap-1">
            <label htmlFor="page-size-select">Items per page:</label>
            <Select
              value={String(pageSize)}
              onValueChange={(value) => {
                const newPageSize = Number(value);
                setPageSize(newPageSize);
                table.setPageSize(newPageSize);
              }}
            >
              <SelectTrigger className="rounded-md border">
                <SelectValue placeholder="Select items per page" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="15">15</SelectItem>
                <SelectItem value="20">20</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MethodsTable;
