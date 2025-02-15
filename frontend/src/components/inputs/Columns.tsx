"use client";

import { AnalysisInput } from "@/api/inputs/types";
import { formatCommonDateString } from "@/api/utils";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<AnalysisInput>[] = [
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
