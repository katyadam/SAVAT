import { useSelectedIRFile } from "@/context/SelectedIRFileContext";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FC } from "react";
import { Switch } from "../ui/switch";
import { Separator } from "../ui/separator";

type NavbarType = {
  highlightCycles: boolean;
  setHighlightCycles: (arg: boolean) => void;
};

const Navbar: FC<NavbarType> = ({ highlightCycles, setHighlightCycles }) => {
  const { selectedIRFileState, selectedIRFileDispatch } = useSelectedIRFile();

  return (
    <div className="ml-10 flex flex-row items-center gap-8">
      <div className="flex flex-row gap-2 items-center text-xl">
        <ChevronLeft
          size="45"
          className="cursor-pointer p-2 hover:text-slate-400 duration-200"
          onClick={() => {
            selectedIRFileDispatch({ type: "MOVE_TO_PREV" });
            setHighlightCycles(false);
          }}
        />
        <p className="p-2">{selectedIRFileState.selectedIRFile}</p>
        <ChevronRight
          size="45"
          className="cursor-pointer p-2 hover:text-slate-400 duration-200"
          onClick={() => {
            selectedIRFileDispatch({ type: "MOVE_TO_NEXT" });
            setHighlightCycles(false);
          }}
        />
      </div>
      <Separator orientation="vertical" className="p-0.5 h-[40px]" />
      <div className="flex flex-col items-center mx-5">
        <label htmlFor="highlightCyclesSwitch" className="text-gray-500 mb-1">
          Show Cycles
        </label>
        <Switch
          id="highlightCyclesSwitch"
          checked={highlightCycles}
          onCheckedChange={() => setHighlightCycles(!highlightCycles)}
        />
      </div>
    </div>
  );
};

export default Navbar;
