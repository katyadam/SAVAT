import { EntityNode, GraphData } from "@/api/entities/types";
import { FC } from "react";
import Graph from "./graphs/Graph";
import { RenderType } from "./types";

import EntityDetailsDiagram from "./graphs/EntityDetailsDiagram";

type RenderGraphProps = {
  onNodeClick: (node: EntityNode) => void;
  entities: GraphData | undefined;
  renderType: RenderType | null;
  showIsolatedNodes: boolean;
  msColors: Map<string, string>;
};

const RenderGraph: FC<RenderGraphProps> = ({
  onNodeClick,
  entities,
  renderType,
  showIsolatedNodes,
  msColors,
}) => {
  if (!entities) return <div>Loading graph...</div>;
  switch (renderType) {
    case RenderType.BASIC_GRAPH:
      return (
        <Graph
          graphData={entities}
          onNodeClick={onNodeClick}
          showIsolatedNodes={showIsolatedNodes}
          msColors={msColors}
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
