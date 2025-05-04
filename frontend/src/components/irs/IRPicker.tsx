import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { useSelectedIRFile } from "@/context/ir/SelectedIRFileContext";
import Loading from "../loading/Loading";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
const IRPicker = () => {
  const [open, setOpen] = useState(false);

  const { selectedIRFileState, selectedIRFileDispatch } = useSelectedIRFile();

  const [query, setQuery] = useState<string>("");

  const filteredData: string[] = selectedIRFileState.irFiles.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );
  if (!selectedIRFileState || !selectedIRFileState.irFiles) return <Loading />;
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="flex justify-between items-center min-w-[200px] max-w-full"
        >
          {selectedIRFileState.selectedIRFile ? (
            <div className="text-left">
              <p className="font-semibold">
                {selectedIRFileState.selectedIRFile}
              </p>
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
            placeholder="Search for IR File..."
            value={query}
            onValueChange={setQuery}
          />
          <CommandEmpty>No IR files found.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {filteredData.map((item) => (
                <CommandItem
                  key={item}
                  value={item}
                  onSelect={() => {
                    selectedIRFileDispatch({
                      type: "SET_SELECTED_FILE",
                      payload: item,
                    });
                    setOpen(false);
                  }}
                >
                  <Check
                    className={`
                      "mr-2 h-4 w-4",
                      ${
                        selectedIRFileState.selectedIRFile === item
                          ? "opacity-100"
                          : "opacity-0"
                      }
                    `}
                  />
                  <div className="flex flex-col border-b-2 w-full p-2 cursor-pointer">
                    <p className="text-lg">{item}</p>
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

export default IRPicker;
