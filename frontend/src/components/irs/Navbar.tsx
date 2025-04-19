import { useSelectedIRFile } from "@/context/SelectedIRFileContext";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FC } from "react";

type NavbarType = {};

const Navbar: FC<NavbarType> = () => {
  const { selectedIRFileState, selectedIRFileDispatch } = useSelectedIRFile();

  return (
    <div className="ml-10">
      <div className="flex flex-row gap-2 items-center text-xl">
        <ChevronLeft
          size="45"
          className="cursor-pointer p-2 hover:text-slate-400 duration-200"
          onClick={() => selectedIRFileDispatch({ type: "MOVE_TO_PREV" })}
        />
        <p className="p-2">{selectedIRFileState.selectedIRFile}</p>
        <ChevronRight
          size="45"
          className="cursor-pointer p-2 hover:text-slate-400 duration-200"
          onClick={() => selectedIRFileDispatch({ type: "MOVE_TO_NEXT" })}
        />
      </div>
    </div>
  );
};

export default Navbar;
