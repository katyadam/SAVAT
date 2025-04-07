import { FC, useEffect, useRef } from "react";
import { ElementsDefinition } from "cytoscape";

import cytoscape from "cytoscape";
import fcose from "cytoscape-fcose";
import { getCyInstance } from "./CytoscapeInstance";
import {
  ChangedLink,
  GenericContextMap,
  Link,
  Node,
  TypeOfChange,
} from "@/api/context-maps/types";
import { useContextMapChange } from "@/hooks/useContextMap";
import { getNodeSignature } from "@/api/context-maps/utils";

type GraphType = {
  onNodeClick: (node: Node) => void;
  graphData: GenericContextMap;
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
      linkedNodeNames.add(
        getNodeSignature({ msName: link.msSource, nodeName: link.source })
      );
      linkedNodeNames.add(
        getNodeSignature({ msName: link.msTarget, nodeName: link.target })
      );
    });
    return nodes.filter((node) => linkedNodeNames.has(getNodeSignature(node)));
  };

  useEffect(() => {
    if (!cyRef.current) return;
    const visibleNodes = getNonIsolatedNodes(graphData.nodes, graphData.links);

    const elements: ElementsDefinition = {
      nodes: (showIsolatedNodes ? graphData.nodes : visibleNodes).map(
        (node: Node) => ({
          data: {
            id: getNodeSignature(node),
            label: node.nodeName,
            microservice: node.msName,
            typeOfChange:
              "typeOfChange" in node
                ? (node.typeOfChange as TypeOfChange)
                : TypeOfChange.NONE,
          },
          group: "nodes",
        })
      ),
      edges: (contextMapChange
        ? contextMapChange.changedLinks
        : graphData.links
      ).map((link: Link | ChangedLink) => ({
        data: {
          source: getNodeSignature({
            msName: link.msSource,
            nodeName: link.source,
          }),
          target: getNodeSignature({
            msName: link.msTarget,
            nodeName: link.target,
          }),
          typeOfChange: "type" in link ? link.type.toString() : "SAME",
        },
        group: "edges",
      })),
    };

    const cyInstance = getCyInstance(cyRef, elements, msColors, "defaultGraph");

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
      const res = graphData.nodes.find(
        (node) => getNodeSignature(node) == nodeData.id
      );
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
