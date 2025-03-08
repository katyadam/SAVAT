"use client";

import { ContextMapDto } from "@/api/context-maps/types";
import { formatCommonDateString } from "@/api/utils";
import { ColumnDef } from "@tanstack/react-table";

export const contextMapsColumns: ColumnDef<ContextMapDto>[] = [
  {
    accessorKey: "version",
    header: "Version",
  },
  {
    accessorKey: "commitHash",
    header: "Commit Hash",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => formatCommonDateString(row.original.createdAt),
  },
];
