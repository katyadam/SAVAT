import { FC } from "react";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { RenderType } from "./types";
import { Switch } from "@/components/ui/switch";

type NavbarType = {
  compareBtnClick: (val: boolean) => void;
  isolatedNodesBtnClick: () => void;
  setSelectedRenderType: (selectedRenderType: RenderType) => void;
};

const Navbar: FC<NavbarType> = ({
  compareBtnClick,
  setSelectedRenderType,
  isolatedNodesBtnClick,
}) => {
  return (
    <div className="flex flex-row justify-start items-center w-full">
      <Button
        onClick={() => compareBtnClick(true)}
        className="mx-5"
        variant="outline"
      >
        Compare
      </Button>
      <Select
        defaultValue={RenderType.BASIC_GRAPH}
        onValueChange={(value) => setSelectedRenderType(value as RenderType)}
      >
        <SelectTrigger className="w-[280px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={RenderType.BASIC_GRAPH}>Basic graph</SelectItem>
          <SelectItem value={RenderType.ENTITY_DETAILS}>
            Entity details
          </SelectItem>
        </SelectContent>
      </Select>
      <div className="flex flex-col items-center mx-5">
        <label
          htmlFor="isolatedNodesSwitch"
          className="text-gray-500 mb-1" // Slightly grey and space below label
        >
          Show all nodes
        </label>
        <Switch
          id="isolatedNodesSwitch"
          onCheckedChange={isolatedNodesBtnClick}
        />
      </div>
    </div>
  );
};

export default Navbar;
