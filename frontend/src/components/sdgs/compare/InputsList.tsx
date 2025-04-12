import { useProjectSDGs } from "@/hooks/useProject";
import { FC } from "react";
import InputInfoBlock from "./InputInfoBlock";
import { SDGDto } from "@/api/sdgs/types";

type InputsListType = {
  projectId: string;
  inputToOmit: SDGDto | null;
  selectedInput: SDGDto | null;
  setSelectedInput: (inputId: SDGDto | null) => void;
};

const InputsList: FC<InputsListType> = ({
  projectId,
  inputToOmit,
  selectedInput,
  setSelectedInput,
}) => {
  const { data: sdgs, isLoading } = useProjectSDGs(projectId);

  if (!sdgs || isLoading) {
    return <p>Wait for Service Dependency Graphs to load...</p>;
  }

  return (
    <div className="max-h-[500px] min-w-[150px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
      {sdgs &&
        sdgs
          .filter((input) => inputToOmit?.id !== input.id)
          .map((input, i) => (
            <div
              key={i}
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
