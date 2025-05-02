import { Graph, Microservice } from "@/api/irs/types";
import { Tabs, TabsList } from "@/components/ui/tabs";
import { FC, useState } from "react";
import MicroserviceDetailTabsTrigger from "./MicroserviceDetailTabsTrigger";
import { TabsContent } from "@radix-ui/react-tabs";
import EndpointsList from "./EndpointsList";
import RESTCallsList from "./RESTCallsList";
import DependenciesList from "./DependenciesList";
import UsedByList from "./UsedByList";
import { getMsEndpoints, getMsRESTCalls } from "@/api/irs/graphFunctions";

type MicroserviceDetailPanelType = {
  ms: Microservice | undefined;
  graph: Graph;
};

export type AllowedTabs =
  | "Endpoints"
  | "REST calls"
  | "Dependencies"
  | "Depends on";

const MicroserviceDetailPanel: FC<MicroserviceDetailPanelType> = ({
  ms,
  graph,
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
        <EndpointsList endpoints={getMsEndpoints(ms)} />
      </TabsContent>
      <TabsContent value="REST calls">
        <RESTCallsList restCalls={getMsRESTCalls(ms)} />
      </TabsContent>
      <TabsContent value="Dependencies">
        <DependenciesList
          ms={ms}
          microservices={graph.nodes}
          irEdges={graph.edges}
        />
      </TabsContent>
      <TabsContent value="Depends on">
        <UsedByList ms={ms} microservices={graph.nodes} irEdges={graph.edges} />
      </TabsContent>
    </Tabs>
  );
};

export default MicroserviceDetailPanel;
