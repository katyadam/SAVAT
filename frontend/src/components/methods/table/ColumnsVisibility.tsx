"use client";

import { ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Column } from "@tanstack/react-table";
import { FC, useState } from "react";
import { CallGraphMethod } from "@/api/callgraphs/types";

type ColumnsVisibilityProps = {
  columns: Column<CallGraphMethod, unknown>[];
};

export const ColumnsVisibility: FC<ColumnsVisibilityProps> = ({ columns }) => {
  const [isFilterCollsOpen, setIsFilterCollsOpen] = useState(false);

  return (
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
        {columns
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
  );
};
