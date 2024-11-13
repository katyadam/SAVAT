import { MicroserviceMethodNode } from "@/api/analysisInputs";
import { FC } from "react";
import MethodRow from "./MethodRow";

type MethodsListProps = {
  methods: MicroserviceMethodNode[];
};

const MethodsList: FC<MethodsListProps> = ({ methods }) => {
  return (
    <div>
      {methods.map((method) => (
        <MethodRow method={method} />
      ))}
    </div>
  );
};

export default MethodsList;
