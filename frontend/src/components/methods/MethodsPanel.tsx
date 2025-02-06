import { FC } from "react";
import { CallGraphMethod } from "@/api/callgraphs/types";
import { MethodsTable } from "./table/MethodsTable";

type MethodsPanelProps = {
  methods: CallGraphMethod[];
  callGraphInputId: string;
};

const MethodsPanel: FC<MethodsPanelProps> = ({ methods, callGraphInputId }) => {
  return (
    <div className="flex m-5">
      <MethodsTable data={methods} callGraphInputId={callGraphInputId} />
    </div>
  );
};

export default MethodsPanel;
