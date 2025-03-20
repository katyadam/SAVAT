import { FC, useEffect, useState } from "react";
import { CallGraphInputsTable } from "./CallGraphInputsTable";
import { callGraphInputsColumns } from "./InputsColumns";
import { useProjectCallGraphInputs } from "@/hooks/useCallGraph";
import Loading from "../loading/Loading";
import { Tabs, TabsContent, TabsList } from "../ui/tabs";
import { TabsTrigger } from "@radix-ui/react-tabs";
import { CallGraphOutputsTable } from "./CallGraphOutputsTable";
import { callGraphOutputsColumns } from "./OutputsColumns";
import { useProjectsCallGraphOutputs } from "@/hooks/useCallGraphOutput";
import Overlay from "../ui/Overlay";
import CompareDialog from "./compare/CompareDialog";
import { Button } from "../ui/button";

type CallGraphsTabType = {
  projectId: string;
};

const CallGraphsTabs: FC<CallGraphsTabType> = ({ projectId }) => {
  const { data: callGraphInputs, isLoading: callGraphInputsLoading } =
    useProjectCallGraphInputs(projectId);

  const { data: callGraphOutputs, isLoading: callGraphOutputsLoading } =
    useProjectsCallGraphOutputs(projectId);

  const [activeTab, setActive] = useState<string>(
    localStorage.getItem("callGraphsActiveTab") || "inputs"
  );

  useEffect(() => {
    localStorage.setItem("callGraphsActiveTab", activeTab);
  }, [activeTab]);

  const [openCompareDialog, setOpenCompareDialog] = useState<boolean>(false);

  return (
    <>
      <Tabs
        defaultValue={activeTab}
        onValueChange={(value) => setActive(value)}
      >
        <TabsList className="text-center bg-white text-black">
          <TabsTrigger
            value="inputs"
            className={
              "py-2 px-4 rounded-tl-md transition-all duration-200 focus:outline-none" +
              (activeTab === "inputs" ? " bg-gray-300" : "")
            }
          >
            Inputs
          </TabsTrigger>
          <TabsTrigger
            value="analysis-outputs"
            className={
              "py-2 px-4 rounded-tr-md transition-all duration-200 focus:outline-none" +
              (activeTab === "analysis-outputs" ? " bg-gray-300" : "")
            }
          >
            Analysis Outputs
          </TabsTrigger>
          <Button
            onClick={() => setOpenCompareDialog(true)}
            variant="link"
            className="text-sm font-bold ml-5"
          >
            Change Impact Analysis
          </Button>
        </TabsList>

        <TabsContent className="mt-0" value="inputs">
          {callGraphInputsLoading ? (
            <Loading />
          ) : (
            <CallGraphInputsTable
              columns={callGraphInputsColumns}
              data={callGraphInputs!}
              projectId={projectId}
            />
          )}
        </TabsContent>
        <TabsContent className="mt-0" value="analysis-outputs">
          {callGraphOutputsLoading ? (
            <Loading />
          ) : (
            <CallGraphOutputsTable
              columns={callGraphOutputsColumns}
              data={callGraphOutputs!}
              projectId={projectId}
            />
          )}
        </TabsContent>
      </Tabs>
      {openCompareDialog && (
        <Overlay width="w-2/3" closeFunc={() => setOpenCompareDialog(false)}>
          <CompareDialog projectId={projectId} />
        </Overlay>
      )}
    </>
  );
};

export default CallGraphsTabs;
