import { MicroserviceNode } from "@/api/projects/analysisInputs";
import { FC, useState } from "react";
import MicroserviceRow from "./MicroserviceRow";
import MethodsList from "./MethodsList";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import CompareForm from "./CompareForm";

type MethodsPanelProps = {
  microservices: MicroserviceNode[];
};

const MethodsPanel: FC<MethodsPanelProps> = ({ microservices }) => {
  const [selectedMicroservice, setSelectedMicroservice] =
    useState<MicroserviceNode | null>(null);

  const [compareUp, setCompareUp] = useState<boolean>(false);

  const handleMicroserviceClick = (ms: MicroserviceNode) => {
    if (ms.name === selectedMicroservice?.name) setSelectedMicroservice(null);
    else setSelectedMicroservice(ms);
  };

  const handleCompareClick = () => {
    setCompareUp(!compareUp);
  };

  return (
    <div className="flex flex-col gap-10 m-5">
      <div className="w-full">
        <Button onClick={handleCompareClick} variant="outline">
          Compare
        </Button>
        <Separator className="mt-2" />
      </div>
      <div className="flex flex-row justify-between gap-5">
        <div className="flex flex-col gap-2">
          {microservices.map((ms) => (
            <MicroserviceRow
              key={ms.name}
              ms={ms}
              onClick={handleMicroserviceClick}
            />
          ))}
        </div>

        {selectedMicroservice && (
          <MethodsList methods={selectedMicroservice.methods} />
        )}
        {compareUp && (
          <>
            <button
              onClick={handleCompareClick}
              className="z-30 bg-black opacity-50 fixed top-0 left-0 w-full h-full"
            ></button>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg z-50 text-center">
              <CompareForm microservices={microservices} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MethodsPanel;
