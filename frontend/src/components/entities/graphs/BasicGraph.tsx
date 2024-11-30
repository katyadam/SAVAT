import { EntityNode, GraphData } from "@/api/entities/types";
import { FC } from "react";
import { ForceGraph2D } from "react-force-graph";

type BasicGraphType = {
  onNodeClick: (node: EntityNode) => void;
  entities: GraphData;
};

const BasicGraph: FC<BasicGraphType> = ({ entities, onNodeClick }) => {
  return (
    <ForceGraph2D
      graphData={entities}
      nodeLabel={(node) =>
        `<p
        style="font-size: 14px; color: #333; background-color: #f0f0f0; padding: 4px 8px; border-radius: 4px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
        ${node.msName}: ${node.nodeName}
    </p>`
      }
      linkLabel={(link) =>
        `<p 
        style="font-size: 14px; color: #333; background-color: #baf0ff; padding: 4px 8px; border-radius: 4px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
        ${link.msSource} -> ${link.msTarget}
    </p>`
      }
      nodeId="nodeName"
      backgroundColor="white"
      nodeColor={() => "black"}
      linkColor={() => "black"}
      linkDirectionalParticleWidth={5}
      linkDirectionalArrowLength={10}
      linkDirectionalArrowRelPos={100}
      onNodeClick={onNodeClick}
    />
  );
};

export default BasicGraph;
