import { FC, useEffect, useRef } from "react";
import { ElementsDefinition } from "cytoscape";

import cytoscape from "cytoscape";
import fcose from "cytoscape-fcose";
import { getCyInstance } from "./CytoscapeInstance";
import { ChangedLink, Link, Node, SDG } from "@/api/sdgs/types";
import { useSDGChange } from "@/hooks/useSDG";
import { getLinkSignature } from "@/api/sdgs/utils";

type GraphType = {
  graph: SDG;
  changedSDGId?: string;
  selectLink: (link: Link) => void;
};

const Graph: FC<GraphType> = ({ graph, changedSDGId, selectLink }) => {
  const { data: changedSDG } = useSDGChange(changedSDGId || "");
  const cyRef = useRef<HTMLDivElement | null>(null);

  cytoscape.use(fcose);

  useEffect(() => {
    if (!cyRef.current) return;

    const elements: ElementsDefinition = {
      nodes: graph.nodes.map((node: Node) => ({
        data: {
          id: node.nodeName,
          label: (node.nodeType ? node.nodeType + "::" : "") + node.nodeName,
        },
        group: "nodes",
      })),
      edges: (changedSDG ? changedSDG.changedLinks : graph.links).map(
        (link: Link | ChangedLink) => ({
          data: {
            id: getLinkSignature(link),
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

    cyInstance.on("tap", "edge", (event) => {
      const clickedLink = event.target.data();
      const foundLink = (
        changedSDG ? changedSDG.changedLinks : graph.links
      ).find(
        (link: Link | ChangedLink) => getLinkSignature(link) == clickedLink.id
      );
      if (foundLink) {
        selectLink(foundLink);
      }
    });

    return () => {
      cyInstance.destroy();
    };
  }, [graph, changedSDG]);

  if (changedSDGId === "None") return <></>;
  return <div ref={cyRef} className="w-full h-[90%]" />;
};

export default Graph;
