"use client";

import { CallGraphInput, CallGraphInputSimple } from "@/api/callgraphs/types";
import { ColumnDef } from "@tanstack/react-table";

export const callGraphInputsColumns: ColumnDef<CallGraphInputSimple>[] = [
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
