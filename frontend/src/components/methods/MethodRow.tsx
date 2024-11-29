import { FC } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MicroserviceMethodNode } from "@/api/methods/types";

type MethodRowProps = {
  method: MicroserviceMethodNode;
};

const MethodRow: FC<MethodRowProps> = ({ method }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="px-3 py-2 text-right border-2 ml-4 m-2 rounded-md hover:bg-slate-50 cursor-zoom-in">
            <p>{method.name}</p>
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{method.bytecodeHash}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default MethodRow;
