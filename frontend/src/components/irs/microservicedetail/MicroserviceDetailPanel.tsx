import { IREdge, Microservice } from "@/api/irs/types";
import { Tabs, TabsList } from "@/components/ui/tabs";
import { FC, useState } from "react";
import MicroserviceDetailTabsTrigger from "./MicroserviceDetailTabsTrigger";
import { TabsContent } from "@radix-ui/react-tabs";
import EndpointsList from "./EndpointsList";
import RESTCallsList from "./RESTCallsList";
import DependenciesList from "./DependenciesList";
import UsedByList from "./UsedByList";
import {
  getMsDependencies,
  getMsEndpoints,
  getMsRESTCalls,
  getMsUsedBy,
} from "@/api/irs/graphFunctions";

type MicroserviceDetailPanelType = {
  ms: Microservice | undefined;
  irEdges: IREdge[];
};

export type AllowedTabs =
  | "Endpoints"
  | "REST calls"
  | "Dependencies"
  | "Depends on";

const MicroserviceDetailPanel: FC<MicroserviceDetailPanelType> = ({
  ms,
  irEdges,
}) => {
  const [activeTab, setActiveTab] = useState<AllowedTabs>("Endpoints");

  if (!ms) return `The microservice for this window wasn't found!`;
  return (
    <Tabs
      defaultValue={activeTab}
      onValueChange={(value) => setActiveTab(value as AllowedTabs)}
    >
      <TabsList className="flex flex-row py-2 text-center border-gray-300">
        <MicroserviceDetailTabsTrigger value="Endpoints" />
        <MicroserviceDetailTabsTrigger value="REST calls" />
        <MicroserviceDetailTabsTrigger value="Dependencies" />
        <MicroserviceDetailTabsTrigger value="Depends on" />
      </TabsList>

      <TabsContent value="Endpoints">
        <h1>Endpoints</h1>
        <EndpointsList endpoints={getMsEndpoints(ms)} />
      </TabsContent>
      <TabsContent value="REST calls">
        <h1>REST calls</h1>
        <RESTCallsList restCalls={getMsRESTCalls(ms)} />
      </TabsContent>
      <TabsContent value="Dependencies">
        <h1>Dependencies</h1>
        <DependenciesList dependencies={getMsDependencies(ms, irEdges)} />
      </TabsContent>
      <TabsContent value="Depends on">
        <h1>Used By</h1>
        <UsedByList usedBy={getMsUsedBy(ms, irEdges)} />
      </TabsContent>
    </Tabs>
  );
};

export default MicroserviceDetailPanel;
