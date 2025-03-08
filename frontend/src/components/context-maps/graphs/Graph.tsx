import { FC, useEffect, useRef } from "react";
import { ElementsDefinition } from "cytoscape";

import cytoscape from "cytoscape";
import fcose from "cytoscape-fcose";
import { getCyInstance } from "./CytoscapeInstance";
import { ChangedLink, ContextMap, Link, Node } from "@/api/context-maps/types";
import { useContextMapChange } from "@/hooks/useContextMap";

type GraphType = {
  onNodeClick: (node: Node) => void;
  graphData: ContextMap;
  showIsolatedNodes: boolean;
  contextMapChangeId?: string;
  msColors: Map<string, string>;
};

const Graph: FC<GraphType> = ({
  graphData,
  onNodeClick,
  showIsolatedNodes,
  contextMapChangeId,
  msColors,
}) => {
  const { data: contextMapChange } = useContextMapChange(
    contextMapChangeId || ""
  );
  const cyRef = useRef<HTMLDivElement | null>(null);

  cytoscape.use(fcose);

  const getNonIsolatedNodes = (nodes: Node[], links: Link[]) => {
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
        (node: Node) => ({
          data: {
            id: node.nodeName,
            label: node.nodeName,
            microservice: node.msName,
          },
          group: "nodes",
        })
      ),
      edges: (contextMapChange
        ? contextMapChange.changedLinks
        : graphData.links
      ).map((link: Link | ChangedLink) => ({
        data: {
          source: link.source,
          target: link.target,
          typeOfChange: "type" in link ? link.type.toString() : "SAME",
        },
        group: "edges",
      })),
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
  }, [graphData, showIsolatedNodes, msColors, contextMapChange]);

  if (contextMapChangeId === "None") {
    return <></>;
  }

  return <div ref={cyRef} className="w-full h-[90%]" />;
};

export default Graph;
