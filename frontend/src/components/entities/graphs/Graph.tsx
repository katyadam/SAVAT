import { FC, useEffect, useMemo, useRef } from "react";
import { ElementsDefinition } from "cytoscape";
import {
  GraphData,
  EntityNode,
  EntityLink,
  ChangedEntityLink,
} from "@/api/entities/types";

import cytoscape from "cytoscape";
import fcose from "cytoscape-fcose";
import { getMicroservicesColors } from "../generators/colorGenerator";
import { getCyInstance } from "./CytoscapeInstance";
import { useEntitiesDiff } from "@/hooks/useEntity";

type GraphType = {
  onNodeClick: (node: EntityNode) => void;
  graphData: GraphData;
  showIsolatedNodes: boolean;
  entitiesDiffId?: string;
};

const Graph: FC<GraphType> = ({
  graphData,
  onNodeClick,
  showIsolatedNodes,
  entitiesDiffId,
}) => {
  const { data: entitiesDiff } = useEntitiesDiff(entitiesDiffId || "");
  const cyRef = useRef<HTMLDivElement | null>(null);
  const msColors = useMemo(
    () => getMicroservicesColors(graphData.nodes),
    [graphData.nodes]
  );

  cytoscape.use(fcose);

  const getNonIsolatedNodes = (nodes: EntityNode[], links: EntityLink[]) => {
    const linkedNodeNames = new Set<string>();

    links.forEach((link) => {
      linkedNodeNames.add(link.source);
      linkedNodeNames.add(link.target);
    });
    return nodes.filter((node) => linkedNodeNames.has(node.nodeName));
  };

  useEffect(() => {
    if (!cyRef.current) return;
    const visibleNodes = getNonIsolatedNodes(graphData.nodes, graphData.links);

    const elements: ElementsDefinition = {
      nodes: (showIsolatedNodes ? graphData.nodes : visibleNodes).map(
        (node: EntityNode) => ({
          data: {
            id: node.nodeName,
            label: node.nodeName,
            microservice: node.msName,
          },
          group: "nodes",
        })
      ),
      edges: (entitiesDiff ? entitiesDiff.changedLinks : graphData.links).map(
        (link: EntityLink | ChangedEntityLink) => ({
          data: {
            source: link.source,
            target: link.target,
            typeOfChange: "type" in link ? link.type.toString() : "SAME",
          },
          group: "edges",
        })
      ),
    };

    const cyInstance = getCyInstance(cyRef, elements, msColors);

    cyInstance.on("tap", "node", (event) => {
      const node = event.target;

      const currentZoom = cyInstance.zoom();
      const zoomIncrement = 0.2;
      const newZoom = currentZoom + zoomIncrement;

      cyInstance.zoom({
        level: newZoom,
        renderedPosition: node.renderedPosition(),
      });
    });

    cyInstance.on("cxttap", "node", (event) => {
      const nodeData = event.target.data();
      const res = graphData.nodes.find((node) => node.nodeName == nodeData.id);
      if (!res) {
        alert("This node doesn't exist!");
      } else {
        onNodeClick(res);
      }
    });

    return () => {
      cyInstance.destroy();
    };
  }, [graphData, showIsolatedNodes, msColors, entitiesDiff]);

  if (entitiesDiffId === "None") {
    return <></>;
  }

  return <div ref={cyRef} className="w-full h-[90%]" />;
};

export default Graph;
