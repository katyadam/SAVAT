import { FC } from "react";
import { Switch } from "../ui/switch";
import { Eye, X } from "lucide-react";
import LegendTable from "./LegendTable";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";

type NavbarType = {
  isolatedNodesBtnClick: () => void;
  msColorsLegend: Map<string, string>;
};

const Navbar: FC<NavbarType> = ({ isolatedNodesBtnClick, msColorsLegend }) => {
  return (
    <div className="flex flex-row ml-5 gap-4 justify-start items-center w-full h-12">
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
          Remove Reachability analysis
        </label>
        <Button variant="ghost">
          <X />
        </Button>
      </div>

      <div>
        <Popover modal={false}>
          <PopoverTrigger>
            <button className="flex flex-col items-center mx-5 cursor-pointer">
              <label className="text-gray-500 mb-1">Legend</label>
              <Eye />
            </button>
          </PopoverTrigger>

          <PopoverContent className="w-full">
            <LegendTable msColorsLegend={msColorsLegend} />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default Navbar;
