import { FC } from "react";
import { Switch } from "../ui/switch";

type NavbarType = {
  isolatedNodesBtnClick: () => void;
};

const Navbar: FC<NavbarType> = ({ isolatedNodesBtnClick }) => {
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
    </div>
  );
};

export default Navbar;
