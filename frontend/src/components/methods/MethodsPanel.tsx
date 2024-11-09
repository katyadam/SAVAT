import { MicroserviceNode } from "@/api/projects/analysisInputs";
import { FC } from "react";
import MicroserviceRow from "./MicroserviceRow";

type MethodsPanelProps = {
  microservices: MicroserviceNode[];
};

const MethodsPanel: FC<MethodsPanelProps> = ({ microservices }) => {
  return (
    <div>
      {microservices.map((ms) => (
        <MicroserviceRow ms={ms} />
      ))}
    </div>
  );
};

export default MethodsPanel;
