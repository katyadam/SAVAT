import { FC, useEffect, useRef, useState } from "react";
import Cytoscape, { ElementsDefinition } from "cytoscape";

import cytoscape from "cytoscape";
import fcose from "cytoscape-fcose";
import { getCyInstance } from "./CytoscapeInstance";
import { ChangedLink, Link, Node, SDG } from "@/api/sdgs/types";
import { useSDGChange } from "@/hooks/useSDG";
import { getLinkSignature } from "@/api/sdgs/utils";
import { useSDGHighlight } from "@/hooks/useGraphEffects";

type GraphType = {
  graph: SDG;
  changedSDGId?: string;
  selectLink: (link: Link) => void;
  selectNode: (node: string) => void;
  selectedNode: string | null;
};

const Graph: FC<GraphType> = ({
  graph,
  changedSDGId,
  selectLink,
  selectNode,
  selectedNode,
}) => {
  const { data: changedSDG } = useSDGChange(changedSDGId || "");
  const cyRef = useRef<HTMLDivElement | null>(null);

  const [cy, setCy] = useState<Cytoscape.Core | null>(null);

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
    setCy(cyInstance);

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
      selectNode(event.target.data().id);
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

  useSDGHighlight(cy, graph, selectedNode);

  if (changedSDGId === "None") return <></>;
  return <div ref={cyRef} className="w-full h-[90%]" />;
};

export default Graph;
