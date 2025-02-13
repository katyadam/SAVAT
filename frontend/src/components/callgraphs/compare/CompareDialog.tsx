import { FC } from "react";
import InputsList from "./InputsList";

type CompareDialogType = {
  projectId: string;
};

const CompareDialog: FC<CompareDialogType> = ({ projectId }) => {
  const leftInputsToOmit = new Set<number>();
  const rightInputsToOmit = new Set<number>();

  return (
    <div className="flex flex-row justify-between">
      <InputsList inputsToOmit={leftInputsToOmit} projectId={projectId} />
      <InputsList inputsToOmit={rightInputsToOmit} projectId={projectId} />
    </div>
  );
};

export default CompareDialog;
