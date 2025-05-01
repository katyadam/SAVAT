import { FC, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import { Button } from "../ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { cn } from "@/lib/utils";
import { CallGraphMethod } from "@/api/callgraphs/types";
import { useCallGraphLookup } from "@/context/callGraph/CallGraphMethodLookupContext";

type SearchBarProps = {
  data: { key: string; value: CallGraphMethod }[];
};

const SearchBar: FC<SearchBarProps> = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<CallGraphMethod | null>(
    null
  );
  const { callGraphLookupDispatch } = useCallGraphLookup();
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
          {selectedMethod ? (
            <div className="text-left">
              <p className="font-semibold">{selectedMethod.name}</p>
            </div>
          ) : (
            "Select method..."
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="max-w-[400px] w-full p-0">
        <Command>
          <CommandInput
            placeholder="Search method..."
            value={query}
            onValueChange={setQuery}
          />
          <CommandEmpty>No methods found.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {filteredData.map((item) => (
                <CommandItem
                  key={item.key}
                  value={item.value.methodSignature}
                  onSelect={() => {
                    setSelectedMethod(item.value);
                    callGraphLookupDispatch({
                      payload: item.key,
                      type: "LOOKUP_METHOD",
                    });
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedMethod?.methodSignature ===
                        item.value.methodSignature
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  <div className="flex flex-col border-b-2 w-full p-2 cursor-pointer">
                    <p className="text-lg">{item.value.name}</p>
                    <p className="font-semibold ">Return Type</p>
                    <p className="text-xs text-gray-500">
                      {item.value.returnType}
                    </p>
                    <div className="flex flex-col">
                      <p className="font-semibold">Parameters</p>
                      {item.value.parameters.map((param, index) => (
                        <p key={index} className="text-xs text-gray-500">
                          {param}
                        </p>
                      ))}
                    </div>
                    <p className="font-semibold">Class</p>
                    <p className="text-xs text-gray-500">{item.value.type}</p>
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

export default SearchBar;
