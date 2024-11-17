import { FC, useState } from "react";
import MicroserviceRow from "./MicroserviceRow";
import MethodsList from "./MethodsList";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import CompareForm from "./CompareForm";
import { CompareMethodsResponse } from "@/api/analysisOutputs";
import Overlay from "../ui/Overlay";
import { MicroserviceNode } from "@/api/methods";

type MethodsPanelProps = {
  analysisInputId: string;
  microservices: MicroserviceNode[];
};

const MethodsPanel: FC<MethodsPanelProps> = ({
  analysisInputId,
  microservices,
}) => {
  const [selectedMicroservice, setSelectedMicroservice] =
    useState<MicroserviceNode | null>(null);

  const [selectedChangedMicroservice, setSelectedChangedMicroservice] =
    useState<MicroserviceNode | null>(null);

  const [compareUp, setCompareUp] = useState<boolean>(false);

  const [compareResponse, setCompareResponse] =
    useState<CompareMethodsResponse | null>(null);

  const handleMicroserviceClick = (ms: MicroserviceNode) => {
    if (ms.name === selectedMicroservice?.name) setSelectedMicroservice(null);
    else setSelectedMicroservice(ms);
  };

  const handleChangedMicroserviceClick = (ms: MicroserviceNode) => {
    if (ms.name === selectedChangedMicroservice?.name) {
      setSelectedChangedMicroservice(null);
    } else {
      setSelectedChangedMicroservice(ms);
    }
  };

  const handleCompareClick = () => {
    setCompareUp(!compareUp);
  };

  const handleCompareResponse = (resp: CompareMethodsResponse) => {
    setCompareResponse(resp);
    setCompareUp(false);
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
          <div className="flex flex-col items-center">
            <h1 className="text-2xl">{selectedMicroservice.name}</h1>
            <MethodsList methods={selectedMicroservice.methods} />
          </div>
        )}
      </div>

      {compareUp && (
        <Overlay closeFunc={handleCompareClick} width="3/4">
          <CompareForm
            analysisInputId={analysisInputId}
            microservices={microservices}
            respFunc={handleCompareResponse}
          />
        </Overlay>
      )}
      {compareResponse && (
        <Overlay
          closeFunc={() => {
            setCompareResponse(null);
            setSelectedChangedMicroservice(null);
          }}
          width="5/6"
        >
          <div className="flex flex-row items-center">
            <div className="flex flex-col gap-2">
              {compareResponse.changedMs.map((ms) => (
                <MicroserviceRow
                  key={ms.name}
                  ms={ms}
                  onClick={handleChangedMicroserviceClick}
                />
              ))}
            </div>
            {selectedChangedMicroservice && (
              <div className="flex flex-col items-center">
                <MethodsList methods={selectedChangedMicroservice.methods} />
              </div>
            )}
          </div>
        </Overlay>
      )}
    </div>
  );
};

export default MethodsPanel;
