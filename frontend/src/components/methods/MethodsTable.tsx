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
import {
  ChevronDown,
  MoreHorizontal,
  X,
  ClipboardCopy,
  Eye,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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

// so that static analysis won't yell at me :(
declare module "@tanstack/react-table" {
  interface FilterFns {
    microserviceFilter: FilterFn<CallGraphMethod>;
  }
}

export const columns: ColumnDef<CallGraphMethod>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="">{row.getValue("name")}</div>,
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
    accessorKey: "microservice",
    header: "Microservice",
    cell: ({ row }) => <div className="">{row.getValue("microservice")}</div>,
    filterFn: "microserviceFilter",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const method = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(method.bytecodeHash)}
            >
              Copy Full Bytecode Hash
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
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
        pageSize: 5,
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
          placeholder="Filter methods..."
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
                onCheckedChange={() => {
                  toggleMicroserviceSelection(service);
                }}
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
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
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
