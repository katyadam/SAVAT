import { ContextMapDto } from "@/api/context-maps/types";
import { useProjectContextMaps } from "@/hooks/useProject";
import { FC } from "react";
import InputInfoBlock from "./InputInfoBlock";

type InputsListType = {
  projectId: string;
  inputToOmit: ContextMapDto | null;
  selectedInput: ContextMapDto | null;
  setSelectedInput: (inputId: ContextMapDto | null) => void;
};

const InputsList: FC<InputsListType> = ({
  projectId,
  inputToOmit,
  selectedInput,
  setSelectedInput,
}) => {
  const { data: contextMaps, isLoading } = useProjectContextMaps(projectId);

  if (!contextMaps || isLoading) {
    return <p>Wait for context maps to load...</p>;
  }

  return (
    <div className="max-h-[500px] min-w-[150px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
      {contextMaps &&
        contextMaps
          .filter((input) => inputToOmit?.id !== input.id)
          .map((input) => (
            <div
              key={selectedInput?.id}
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
              <InputInfoBlock key={selectedInput?.id} input={input} />
            </div>
          ))}
    </div>
  );
};

export default InputsList;
