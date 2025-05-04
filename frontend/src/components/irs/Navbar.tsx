import { useSelectedIRFile } from "@/context/ir/SelectedIRFileContext";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FC } from "react";
import { Switch } from "../ui/switch";
import { Separator } from "../ui/separator";
import NumberInput from "../ui/NumberInput";
import MsSearchBar from "./MsSearchBar";
import { Microservice } from "@/api/irs/types";
import IRApi from "@/api/irs/api";
import IRPicker from "./IRPicker";

type NavbarType = {
  highlightCycles: boolean;
  setHighlightCycles: (arg: boolean) => void;
  couplingThreshold: number;
  setCouplingThreshold: (arg: number) => void;
  microservices: Microservice[];
};

const Navbar: FC<NavbarType> = ({
  highlightCycles,
  setHighlightCycles,
  couplingThreshold,
  setCouplingThreshold,
  microservices,
}) => {
  const { selectedIRFileDispatch } = useSelectedIRFile();
  return (
    <div className="ml-10 flex flex-row items-center gap-8">
      <div className="flex flex-row gap-2 items-center text-xl">
        <ChevronLeft
          size="45"
          className="cursor-pointer p-2 hover:text-slate-400 duration-200"
          onClick={() => {
            selectedIRFileDispatch({ type: "MOVE_TO_PREV" });
            setHighlightCycles(false);
            setCouplingThreshold(0);
          }}
        />
        <IRPicker />
        <ChevronRight
          size="45"
          className="cursor-pointer p-2 hover:text-slate-400 duration-200"
          onClick={() => {
            selectedIRFileDispatch({ type: "MOVE_TO_NEXT" });
            setHighlightCycles(false);
            setCouplingThreshold(0);
          }}
        />
      </div>

      <MsSearchBar
        data={microservices.map((ms) => ({
          key: IRApi.getMsId(ms),
          value: ms,
        }))}
      />

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

      <div className="flex flex-col items-center mx-5">
        <label htmlFor="highlightCyclesSwitch" className="text-gray-500 mb-1">
          Show Coupling
        </label>

        <NumberInput
          value={couplingThreshold}
          setValue={setCouplingThreshold}
          min={0}
          max={50}
          step={1}
        />
      </div>
    </div>
  );
};

export default Navbar;
