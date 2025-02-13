import { FC, useState } from "react";
import InputsList from "./InputsList";

type CompareDialogType = {
  projectId: string;
};

const CompareDialog: FC<CompareDialogType> = ({ projectId }) => {
  const leftInputsToOmit = new Set<number>();
  const rightInputsToOmit = new Set<number>();
  const [leftSelected, setLeftSelected] = useState<number | null>(null);
  const [rightSelected, setRightSelected] = useState<number | null>(null);

  return (
    <div className="flex flex-row justify-between">
      <InputsList
        inputsToOmit={leftInputsToOmit}
        projectId={projectId}
        setSelectedInput={setLeftSelected}
      />
      <InputsList
        inputsToOmit={rightInputsToOmit}
        projectId={projectId}
        setSelectedInput={setRightSelected}
      />
    </div>
  );
};

export default CompareDialog;
