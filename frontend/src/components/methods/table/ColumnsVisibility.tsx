"use client";

import * as React from "react";
import { ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Column } from "@tanstack/react-table";

type ColumnsVisibilityProps = {
  columns: Column<any, unknown>[];
};

export const ColumnsVisibility: React.FC<ColumnsVisibilityProps> = ({
  columns,
}) => {
  const [isFilterCollsOpen, setIsFilterCollsOpen] = React.useState(false);

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
