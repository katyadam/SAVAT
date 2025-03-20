"use client";

import {
  ContextMapDto,
  ContextMapOutputSimple,
} from "@/api/context-maps/types";
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

export const contextMapsOutputsColumns: ColumnDef<ContextMapOutputSimple>[] = [
  {
    accessorKey: "sourceInput",
    header: "Source Input",
    cell: ({ row }) => {
      const source = row.original.sourceInput;
      return (
        <a
          className="block group hover:text-blue-400"
          href={`/context-maps/${source.id}`}
        >
          <div className="flex flex-col gap-2">
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-gray-500 group-hover:text-blue-400">
                Version
              </span>
              <div className="group-hover:text-blue-400">{source.version}</div>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-gray-500 group-hover:text-blue-400">
                Commit Hash
              </span>
              <div className="group-hover:text-blue-400">
                {source.commitHash}
              </div>
            </div>
          </div>
        </a>
      );
    },
  },
  {
    accessorKey: "targetInput",
    header: "Target Input",
    cell: ({ row }) => {
      const target = row.original.targetInput;
      return (
        <a
          className="block group hover:text-blue-400"
          href={`/context-maps/${target.id}`}
        >
          <div className="flex flex-col gap-2">
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-gray-500 group-hover:text-blue-400">
                Version
              </span>
              <div className="group-hover:text-blue-400">{target.version}</div>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-gray-500 group-hover:text-blue-400">
                Commit Hash
              </span>
              <div className="group-hover:text-blue-400">
                {target.commitHash}
              </div>
            </div>
          </div>
        </a>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => formatCommonDateString(row.original.createdAt),
  },
];
