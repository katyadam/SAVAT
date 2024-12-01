import { GraphData } from "@/api/entities/types";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import Graph, { DirectedGraph } from "graphology";
import {
  FullScreenControl,
  SigmaContainer,
  ZoomControl,
} from "@react-sigma/core";
import { constant, keyBy, mapValues, omit } from "lodash";

import { Settings } from "sigma/settings";
import { drawHover, drawLabel } from "../canvas/canvasUtils";
type EntityDetailsGraphType = {
  entities: GraphData;
};

const EntityDetailsGraph: FC<EntityDetailsGraphType> = ({ entities }) => {
  const graph = useMemo(() => new DirectedGraph(), []);
  const [dataReady, setDataReady] = useState(false);

  const sigmaSettings: Partial<Settings> = useMemo(
    () => ({
      defaultDrawNodeLabel: drawLabel,
      defaultDrawNodeHover: drawHover,
      defaultEdgeType: "arrow",
      labelDensity: 0.07,
      labelGridCellSize: 60,
      labelRenderedSizeThreshold: 15,
      labelFont: "Lato, sans-serif",
      zIndex: false,
    }),
    []
  );

  // TODO: should be on server side!
  const msNames = Array.from(
    new Map(
      entities.nodes.map((node) => [
        node.msName,
        { key: node.nodeFullName, msName: node.msName },
      ])
    ).values()
  );

  useEffect(() => {
    const clusters = keyBy(msNames, "key");
    entities.nodes.forEach((node) => {
      console.log(node.nodeName);
      if (!graph.hasNode(node.nodeName)) {
        graph.addNode(node.nodeName, {
          ...node,
          ...omit(clusters[node.msName], "key"),
        });
      }
    });
    console.log(entities.links); // TODO: WTF ?????
    entities.links.forEach((link) => {
      const edgeId = `${link.source}-${link.target}`;
      if (!graph.hasEdge(link.source.nodeName, link.target.nodeName)) {
        graph.addEdge(link.source.nodeName, link.target.nodeName, {
          id: edgeId,
          size: 1,
          msSource: link.msSource,
          msTarget: link.msTarget,
          sourceMultiplicity: link.sourceMultiplicity,
          targetMultiplicity: link.targetMultiplicity,
        });
      }
    });

    graph.forEachNode((node) => graph.setNodeAttribute(node, "size", 15));
    requestAnimationFrame(() => setDataReady(true));
  }, []);

  if (!entities) return <div>Loading...</div>;

  return (
    <div>
      <SigmaContainer graph={graph} settings={sigmaSettings}>
        {/* your content */}
      </SigmaContainer>
    </div>
  );
};

export default EntityDetailsGraph;
