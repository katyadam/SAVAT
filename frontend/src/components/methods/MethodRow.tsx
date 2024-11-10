import { MicroserviceMethodNode } from "@/api/analysisInputs";
import { FC } from "react";

type MethodRowProps = {
  method: MicroserviceMethodNode;
};

const MethodRow: FC<MethodRowProps> = ({ method }) => {
  return (
    <div className="flex flex-col justify-between px-3 py-2 border-2 ml-4 m-2 rounded-md hover:bg-slate-50 cursor-pointer">
      <p>{method.name}</p>
      <p>{method.bytecodeHash}</p>
    </div>
  );
};

export default MethodRow;
