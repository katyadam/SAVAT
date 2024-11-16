import { FC, useEffect, useState } from "react";
import { ForceGraph3D } from "react-force-graph";
import data from "./testData.json";
import { GraphData, GraphNode } from "@/api/entities";

type RenderGraphProps = {
  onNodeClick: (node: GraphNode) => void;
};

const RenderGraph: FC<RenderGraphProps> = ({ onNodeClick }) => {
  const [graphData, setGraphData] = useState<GraphData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setGraphData(data);
      } catch (error) {
        console.error("Failed to load graph data:", error);
      }
    };

    fetchData();
  }, []);

  return graphData ? (
    <ForceGraph3D
      graphData={graphData}
      nodeLabel={(node) => `${node.msName}: ${node.nodeName}`}
      linkDirectionalParticles={1}
      linkLabel={(link) => `${link.msSource} -> ${link.msTarget}`}
      nodeId="nodeName"
      backgroundColor="white"
      nodeColor={() => "black"}
      linkColor={() => "black"}
      linkDirectionalParticleColor={() => "red"}
      linkWidth={5}
      linkDirectionalParticleWidth={5}
      linkDirectionalArrowLength={5}
      linkDirectionalParticleSpeed={0.02}
      onNodeClick={onNodeClick}
    />
  ) : (
    <div>Loading graph...</div>
  );
};

export default RenderGraph;
