"use client";

import { AnalysisInput } from "@/api/analysisInputs";
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
  },
];
