import { CallGraphInputSimple } from "@/api/callgraphs/types";
import { useProjectCallGraphInputs } from "@/hooks/useCallGraph";
import { FC } from "react";
import InputInfoBlock from "./InputInfoBlock";

type InputsListType = {
  projectId: string;
  inputToOmit: CallGraphInputSimple | null;
  selectedInput: CallGraphInputSimple | null;
  setSelectedInput: (inputId: CallGraphInputSimple | null) => void;
};

const InputsList: FC<InputsListType> = ({
  projectId,
  inputToOmit,
  selectedInput,
  setSelectedInput,
}) => {
  const { data: callGraphInputs, isLoading } =
    useProjectCallGraphInputs(projectId);

  if (!callGraphInputs || isLoading) {
    return <p>Wait for analysis inputs to load...</p>;
  }

  return (
    <div className="max-h-[500px] min-w-[150px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
      {callGraphInputs &&
        callGraphInputs
          .filter((input) => inputToOmit?.id !== input.id)
          .map((input) => (
            <div
              onClick={() =>
                selectedInput?.id === input.id
                  ? setSelectedInput(null)
                  : setSelectedInput(input)
              }
              className={`
                flex flex-col text-left border-b-2 p-2 hover:bg-slate-200 duration-100 cursor-pointer 
                ${selectedInput?.id == input.id && "bg-slate-200"}
                `}
            >
              <InputInfoBlock input={input} />
            </div>
          ))}
    </div>
  );
};

export default InputsList;
