import { FC, useState } from "react";
import { Switch } from "../ui/switch";
import { Eye, RefreshCw } from "lucide-react";
import LegendTable from "./LegendTable";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { AutoComplete } from "../ui/autocomplete";
import { CallGraphMethod } from "@/api/callgraphs/types";

type NavbarType = {
  isolatedNodesBtnClick: () => void;
  msColorsLegend: Map<string, string>;
  setMsToHighlight: (ms: string) => void;
  methods: CallGraphMethod[];
};

const Navbar: FC<NavbarType> = ({
  isolatedNodesBtnClick,
  msColorsLegend,
  setMsToHighlight,
  methods,
}) => {
  const [searchValue, setSearchValue] = useState<{
    value: string;
    label: string;
  }>();
  return (
    <div className="flex flex-row ml-5 gap-4 justify-start items-center w-full h-12">
      <AutoComplete
        options={methods.map((method) => ({
          value: method.methodSignature,
          label: method.name,
        }))}
        emptyMessage="Method not found!"
        onValueChange={setSearchValue}
        placeholder="Search for method..."
      />
      <div>
        <Popover modal={false}>
          <PopoverTrigger>
            <button className="flex flex-col items-center mx-5 cursor-pointer">
              <label className="text-gray-500 mb-1">Legend</label>
              <Eye />
            </button>
          </PopoverTrigger>

          <PopoverContent className="w-full">
            <LegendTable
              msColorsLegend={msColorsLegend}
              setMsToHighlight={setMsToHighlight}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex flex-col items-center mx-5">
        <label htmlFor="isolatedNodesSwitch" className="text-gray-500 mb-1">
          Show all nodes
        </label>
        <Switch
          id="isolatedNodesSwitch"
          onCheckedChange={isolatedNodesBtnClick}
        />
      </div>
      <div className="flex flex-col items-center mx-5">
        <label htmlFor="isolatedNodesSwitch" className="text-gray-500 mb-1">
          Reload Graph
        </label>
        <RefreshCw
          className="cursor-pointer"
          onClick={() => window.location.reload()}
        />
      </div>
    </div>
  );
};

export default Navbar;
