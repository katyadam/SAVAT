import { CallGraphInputSimple } from "@/api/callgraphs/types";
import { FC } from "react";

type InputInfoBlockType = {
  input: CallGraphInputSimple | null;
};

const InputInfoBlock: FC<InputInfoBlockType> = ({ input }) => {
  if (!input) return <></>;
  return (
    <div>
      <span className="text-xs font-semibold text-gray-500 group-hover:text-blue-400">
        Version
      </span>
      <div className="group-hover:text-blue-400">{input.version}</div>
      <span className="text-xs font-semibold text-gray-500 group-hover:text-blue-400">
        Commit Hash
      </span>
      <div className="group-hover:text-blue-400">{input.commitHash}</div>
      <span className="text-xs font-semibold text-gray-500 group-hover:text-blue-400">
        Branch
      </span>
      <div className="group-hover:text-blue-400">{input.branch}</div>
    </div>
  );
};

export default InputInfoBlock;
