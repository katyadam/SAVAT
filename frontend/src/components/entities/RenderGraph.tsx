import { EntityNode, GraphData } from "@/api/entities/types";
import { FC } from "react";
import BasicGraph from "./graphs/BasicGraph";
import { RenderType } from "./types";
import large from "./testData.json";

import EntityDetailsDiagram from "./graphs/EntityDetailsDiagram";

type RenderGraphProps = {
  onNodeClick: (node: EntityNode) => void;
  entities: GraphData | undefined;
  renderType: RenderType | null;
  showIsolatedNodes: boolean;
};

const RenderGraph: FC<RenderGraphProps> = ({
  onNodeClick,
  entities,
  renderType,
  showIsolatedNodes,
}) => {
  if (!entities) return <div>Loading graph...</div>;
  entities = large;
  switch (renderType) {
    case RenderType.BASIC_GRAPH:
      return (
        <BasicGraph
          graphData={entities}
          onNodeClick={onNodeClick}
          showIsolatedNodes={showIsolatedNodes}
        />
      );
    case RenderType.ENTITY_DETAILS:
      return (
        <EntityDetailsDiagram
          graphData={entities}
          showIsolatedNodes={showIsolatedNodes}
        />
      );

    default:
      break;
  }
};

export default RenderGraph;
