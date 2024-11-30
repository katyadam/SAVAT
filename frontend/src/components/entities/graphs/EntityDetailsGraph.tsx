import { GraphData } from "@/api/entities/types";
import { FC } from "react";
import { ForceGraph2D } from "react-force-graph";
import { nodeCanvasObject } from "../canvas/GraphNodeCanvas";
type EntityDetailsGraphType = {
  entities: GraphData;
};

const EntityDetailsGraph: FC<EntityDetailsGraphType> = ({ entities }) => {
  return (
    <ForceGraph2D
      width={window.innerWidth}
      height={650}
      graphData={entities}
      cooldownTicks={50}
      nodeRelSize={1}
      linkColor={() => "grey"}
      linkDirectionalArrowLength={5}
      linkDirectionalArrowColor="black"
      nodeCanvasObject={nodeCanvasObject}
    />
  );
};

export default EntityDetailsGraph;
