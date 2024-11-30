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

type NavbarType = {
  compareBtnClick: (val: boolean) => void;
  setSelectedRenderType: (selectedRenderType: RenderType) => void;
};

const Navbar: FC<NavbarType> = ({ compareBtnClick, setSelectedRenderType }) => {
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
          <SelectItem value={RenderType.DOMAIN_VIEW}>Domain view</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Navbar;
