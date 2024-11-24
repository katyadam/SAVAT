import EntitiesApi, {
  ChangedEntityLinkType,
  GraphDataChangedLinks,
} from "@/api/entities";
import { FC } from "react";
import { ForceGraph3D } from "react-force-graph";

type RenderCompareGraphType = {
  entities: GraphDataChangedLinks;
};

const RenderCompareGraph: FC<RenderCompareGraphType> = ({ entities }) => {
  console.log(entities);

  return entities ? (
    <ForceGraph3D
      graphData={entities}
      nodeLabel={(node) =>
        `<p 
                style="font-size: 14px; color: #333; background-color: #f0f0f0; padding: 4px 8px; border-radius: 4px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
                ${node.msName}: ${node.nodeName}
            </p>`
      }
      linkDirectionalParticles={1}
      linkLabel={(link) =>
        `<p 
                style="font-size: 14px; color: #333; background-color: #baf0ff; padding: 4px 8px; border-radius: 4px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
                ${link.msSource} -> ${link.msTarget}
            </p>`
      }
      nodeId="nodeName"
      backgroundColor="white"
      nodeColor={() => "black"}
      linkColor={(link) => EntitiesApi.getChangedColor(link.type.toString())}
      linkDirectionalParticleColor={() => "red"}
      linkWidth={5}
      linkDirectionalParticleWidth={5}
      linkDirectionalArrowLength={5}
      linkDirectionalParticleSpeed={0.02}
    />
  ) : (
    <div>Loading graph...</div>
  );
};

export default RenderCompareGraph;
