import { CallGraphMethod } from "@/api/callgraphs/types";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@radix-ui/react-tooltip";
import { ColumnDef, FilterFn } from "@tanstack/react-table";
import { ClipboardCopy } from "lucide-react";

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
