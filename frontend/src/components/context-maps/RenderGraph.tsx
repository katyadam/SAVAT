import { FC } from "react";
import Graph from "./graphs/Graph";
import { RenderType } from "./types";

import EntityDetailsDiagram from "./graphs/EntityDetailsDiagram";
import { GenericContextMap, Node } from "@/api/context-maps/types";

type RenderGraphProps = {
  onNodeClick: (node: Node) => void;
  contextMap: GenericContextMap | undefined;
  renderType: RenderType | null;
  showIsolatedNodes: boolean;
  msColors: Map<string, string>;
};

const RenderGraph: FC<RenderGraphProps> = ({
  onNodeClick,
  contextMap,
  renderType,
  showIsolatedNodes,
  msColors,
}) => {
  if (!contextMap) return <div>Loading graph...</div>;
  switch (renderType) {
    case RenderType.BASIC_GRAPH:
      return (
        <Graph
          graphData={contextMap}
          onNodeClick={onNodeClick}
          showIsolatedNodes={showIsolatedNodes}
          msColors={msColors}
        />
      );
    case RenderType.ENTITY_DETAILS:
      return (
        <EntityDetailsDiagram
          graphData={contextMap}
          showIsolatedNodes={showIsolatedNodes}
          msColors={msColors}
        />
      );

    default:
      break;
  }
};

export default RenderGraph;
