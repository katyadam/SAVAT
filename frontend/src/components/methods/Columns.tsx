"use client";

import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<{ name: string; methodsSize: number }>[] = [
  {
    accessorKey: "name",
    header: "Microservice Name",
  },
  {
    accessorKey: "methodsSize",
    header: "Number of Methods",
  },
];
