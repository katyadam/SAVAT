import { useProjectsContextMapOutputs } from "@/hooks/useContextMapOutput";
import { useProjectContextMaps } from "@/hooks/useProject";
import { FC, useEffect, useState } from "react";
import { Button } from "../ui/button";
import Loading from "../loading/Loading";
import { ContextMapsInputsTable } from "./ContextMapsInputsTable";
import { contextMapsColumns, contextMapsOutputsColumns } from "./Columns";
import { ContextMapsOutputsTable } from "./ContextMapsOutputsTable";
import Overlay from "../ui/Overlay";
import { Tabs, TabsContent, TabsList } from "../ui/tabs";
import { TabsTrigger } from "@radix-ui/react-tabs";
import CIAPanel from "./compare/CIAPanel";

type ContextMapsTabsType = {
  projectId: string;
};

const ContextMapsTabs: FC<ContextMapsTabsType> = ({ projectId }) => {
  const { data: contextMapInputs, isLoading: contextMapInputsLoading } =
    useProjectContextMaps(projectId);

  const { data: contextMapOutputs, isLoading: contextMapOutputsLoading } =
    useProjectsContextMapOutputs(projectId);

  const [activeTab, setActive] = useState<string>(
    localStorage.getItem("contextMapsActiveTab") || "inputs"
  );

  useEffect(() => {
    localStorage.setItem("contextMapsActiveTab", activeTab);
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
              "py-2 px-4 rounded-tl-md transition-all duration-200 focus:outline-none " +
              (activeTab === "inputs" ? " bg-gray-300" : "")
            }
          >
            Inputs
          </TabsTrigger>
          <TabsTrigger
            value="analysis-outputs"
            className={
              "py-2 px-4 rounded-tr-md transition-all duration-200 focus:outline-none " +
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
          {contextMapInputsLoading ? (
            <Loading />
          ) : (
            <ContextMapsInputsTable
              columns={contextMapsColumns}
              data={contextMapInputs!}
              projectId={projectId}
            />
          )}
        </TabsContent>
        <TabsContent className="mt-0" value="analysis-outputs">
          {contextMapOutputsLoading ? (
            <Loading />
          ) : (
            <ContextMapsOutputsTable
              columns={contextMapsOutputsColumns}
              data={contextMapOutputs!}
              projectId={projectId}
            />
          )}
        </TabsContent>
      </Tabs>
      {openCompareDialog && (
        <Overlay width="w-2/3" closeFunc={() => setOpenCompareDialog(false)}>
          <CIAPanel projectId={projectId} />
        </Overlay>
      )}
    </>
  );
};

export default ContextMapsTabs;
