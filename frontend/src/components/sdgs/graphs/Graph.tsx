import { FC, useEffect, useRef } from "react";
import { ElementsDefinition } from "cytoscape";

import cytoscape from "cytoscape";
import fcose from "cytoscape-fcose";
import { getCyInstance } from "./CytoscapeInstance";
import { ChangedLink, Link, Node, SDG } from "@/api/sdgs/types";
import { useSDGChange } from "@/hooks/useSDG";

type GraphType = {
  graph: SDG;
  changedSDGId?: string;
};

const Graph: FC<GraphType> = ({ graph, changedSDGId }) => {
  const { data: changedSDG } = useSDGChange(changedSDGId || "");
  const cyRef = useRef<HTMLDivElement | null>(null);

  cytoscape.use(fcose);

  useEffect(() => {
    if (!cyRef.current) return;

    const elements: ElementsDefinition = {
      nodes: graph.nodes.map((node: Node) => ({
        data: {
          id: node.nodeName,
          label: node.nodeName,
        },
        group: "nodes",
      })),
      edges: (changedSDG ? changedSDG.changedLinks : graph.links).map(
        (link: Link | ChangedLink) => ({
          data: {
            source: link.source,
            target: link.target,
            typeOfChange: "type" in link ? link.type.toString() : "SAME",
          },
          group: "edges",
        })
      ),
    };

    const cyInstance = getCyInstance(cyRef, elements);

    cyInstance.on("layoutstop", () => {
      cyInstance.nodes().forEach((node) => {
        const position = node.position();
        node.position({
          x: position.x - 20,
          y: position.y - 10,
        });
      });
    });

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

    return () => {
      cyInstance.destroy();
    };
  }, [graph, changedSDG]);

  if (changedSDGId === "None") return <></>;
  return <div ref={cyRef} className="w-full h-[90%]" />;
};

export default Graph;
