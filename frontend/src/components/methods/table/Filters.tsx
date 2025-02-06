"use client";

import * as React from "react";
import { ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type FiltersProps = {
  uniqueMicroservices: Set<string>;
  selectedMicroservices: Set<string>;
  toggleMicroserviceSelection: (microservice: string) => void;
  onFilterByName: (value: string) => void;
};

export const Filters: React.FC<FiltersProps> = ({
  uniqueMicroservices,
  selectedMicroservices,
  toggleMicroserviceSelection,
  onFilterByName,
}) => {
  const [isFilterMsOpen, setIsFilterMsOpen] = React.useState(false);

  return (
    <div className="flex items-center py-4 gap-5">
      <Input
        placeholder="Filter by their names..."
        onChange={(event) => onFilterByName(event.target.value)}
        className="w-full"
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
              onCheckedChange={() => toggleMicroserviceSelection(service)}
              onSelect={(e) => e.preventDefault()}
            >
              {service}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
