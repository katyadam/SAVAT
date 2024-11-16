import { MicroserviceMethodNode } from "@/api/analysisInputs";
import { FC } from "react";
import MethodRow from "./MethodRow";

type MethodsListProps = {
  methods: MicroserviceMethodNode[];
};

const MethodsList: FC<MethodsListProps> = ({ methods }) => {
  return (
    <div className="flex flex-col gap-2">
      {methods.map((method) => (
        <div className="flex justify-end">
          <MethodRow method={method} />
        </div>
      ))}
    </div>
  );
};

export default MethodsList;
