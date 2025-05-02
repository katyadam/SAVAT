import { FC, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Button } from "../ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { Microservice } from "@/api/irs/types";
import { useIRMicroserviceLookup } from "@/context/ir/IRMicroserviceLookupContext";

type MsSearchBarType = {
  data: { key: string; value: Microservice }[];
};

const MsSearchBar: FC<MsSearchBarType> = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [selectedMs, setSelectedMs] = useState<Microservice | null>();

  const { irMicroserviceLookupDispatch } = useIRMicroserviceLookup();

  const [query, setQuery] = useState<string>("");

  const filteredData = data.filter((item) =>
    item.value.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="flex justify-between items-center min-w-[200px] max-w-full"
        >
          {selectedMs ? (
            <div className="text-left">
              <p className="font-semibold">{selectedMs.name}</p>
            </div>
          ) : (
            "Select microservice..."
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="max-w-[400px] w-full p-0">
        <Command>
          <CommandInput
            placeholder="Search microservice..."
            value={query}
            onValueChange={setQuery}
          />
          <CommandEmpty>No microservices found.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {filteredData.map((item) => (
                <CommandItem
                  key={item.key}
                  value={item.value.name}
                  onSelect={() => {
                    setSelectedMs(item.value);
                    irMicroserviceLookupDispatch({
                      payload: item.key,
                      type: "LOOKUP_MS",
                    });
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedMs?.name === item.value.name
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  <div className="flex flex-col border-b-2 w-full p-2 cursor-pointer">
                    <p className="text-lg">{item.value.name}</p>
                    <p className="font-semibold ">Path</p>
                    <p className="text-xs text-gray-500">{item.value.path}</p>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default MsSearchBar;
