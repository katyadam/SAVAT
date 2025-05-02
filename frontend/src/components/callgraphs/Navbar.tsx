import { FC } from "react";
import { Switch } from "../ui/switch";
import { Eye } from "lucide-react";
import LegendTable from "./LegendTable";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CallGraphMethod } from "@/api/callgraphs/types";
import CallGraphSearchBar from "./CallGraphSearchBar";
import { Action } from "@/pages/CallGraphPage";
import ActionsTable from "./ActionsTable";

type NavbarType = {
  isolatedNodesBtnClick: (() => void) | null;
  msColorsLegend: Map<string, string>;
  setMsToHighlight: (ms: string) => void;
  methods: CallGraphMethod[];
  setActionsStorage: (actionsStorage: Action[]) => void;
  actionsStorage: Action[];
  setRemovedAction: (action: Action) => void;

  closeContextMenu: () => void;
  hintComponent?: React.ReactNode;
};

const Navbar: FC<NavbarType> = ({
  isolatedNodesBtnClick,
  msColorsLegend,
  setMsToHighlight,
  methods,
  setActionsStorage,
  actionsStorage,
  setRemovedAction,
  closeContextMenu,
  hintComponent,
}) => {
  return (
    <div className="flex flex-row ml-5 gap-4 justify-start items-center w-full h-12">
      <CallGraphSearchBar
        data={methods.map((method) => ({
          key: method.methodSignature,
          value: method,
        }))}
      />
      <Popover modal={false}>
        <PopoverTrigger className="flex flex-col items-center mx-5 cursor-pointer">
          <label className="text-gray-500 mb-1">Legend</label>
          <Eye />
        </PopoverTrigger>

        <PopoverContent className="w-full">
          <LegendTable
            msColorsLegend={msColorsLegend}
            setMsToHighlight={setMsToHighlight}
            hintComponent={hintComponent}
          />
        </PopoverContent>
      </Popover>
      <Popover modal={false}>
        <PopoverTrigger className="relative flex flex-col items-center mx-5 cursor-pointer">
          <label className="text-gray-500 mb-1">Actions Taken</label>
          <div className="relative">
            <Eye />
            {actionsStorage.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {actionsStorage.length}
              </span>
            )}
          </div>
        </PopoverTrigger>

        <PopoverContent className="w-full">
          <ActionsTable
            actionsStorage={actionsStorage}
            setActionsStorage={setActionsStorage}
            setRemovedAction={setRemovedAction}
          />
        </PopoverContent>
      </Popover>

      {isolatedNodesBtnClick && (
        <div className="flex flex-col items-center mx-5">
          <label htmlFor="isolatedNodesSwitch" className="text-gray-500 mb-1">
            Show all nodes
          </label>
          <Switch
            id="isolatedNodesSwitch"
            onCheckedChange={() => {
              isolatedNodesBtnClick();
              closeContextMenu(); // prevents freezing context menu when switch between multiple nodes happens
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Navbar;
