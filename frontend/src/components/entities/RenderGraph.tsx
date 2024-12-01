import { EntityNode, GraphData } from "@/api/entities/types";
import { FC } from "react";
import BasicGraph from "./graphs/BasicGraph";
import { RenderType } from "./types";
import EntityDetailsGraph from "./graphs/EntityDetailsGraph";
import DomainViewGraph from "./graphs/DomainViewGraph";

import large from "./testData.json";

type RenderGraphProps = {
  onNodeClick: (node: EntityNode) => void;
  entities: GraphData | undefined;
  renderType: RenderType | null;
};

const RenderGraph: FC<RenderGraphProps> = ({
  onNodeClick,
  entities,
  renderType,
}) => {
  if (!entities) return <div>Loading graph...</div>;
  entities = large;
  switch (renderType) {
    case RenderType.BASIC_GRAPH:
      return <BasicGraph entities={entities} onNodeClick={onNodeClick} />;
    case RenderType.ENTITY_DETAILS:
      return <EntityDetailsGraph entities={entities} />;
    case RenderType.DOMAIN_VIEW:
      return <DomainViewGraph entities={entities} />;
    default:
      break;
  }
};

export default RenderGraph;
