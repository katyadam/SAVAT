import { GraphData } from "@/api/entities/types";
import { FC } from "react";
import { ForceGraph2D } from "react-force-graph";

type DomainViewGraphType = {
  entities: GraphData;
};

const DomainViewGraph: FC<DomainViewGraphType> = ({ entities }) => {
  return (
    <ForceGraph2D
      graphData={entities}
      nodeId="nodeName"
      backgroundColor="white"
      nodeColor={() => "black"}
      linkColor={() => "black"}
      linkDirectionalParticleWidth={5}
      linkDirectionalArrowLength={10}
      linkDirectionalArrowRelPos={100}
    />
  );
};

export default DomainViewGraph;
