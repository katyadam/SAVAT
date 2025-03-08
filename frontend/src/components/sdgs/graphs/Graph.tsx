import { FC, useEffect, useRef } from "react";
import { ElementsDefinition } from "cytoscape";

import cytoscape from "cytoscape";
import fcose from "cytoscape-fcose";
import {
  ChangedCommGraphLink,
  CommGraph,
  CommGraphLink,
  CommGraphNode,
} from "@/api/communication-graphs/types";
import { getCyInstance } from "./CytoscapeInstance";
import { useCommGraphDiff } from "@/hooks/useCommGraph";

type GraphType = {
  graph: CommGraph;
  commGraphDiffId?: string;
};

const Graph: FC<GraphType> = ({ graph, commGraphDiffId }) => {
  const { data: commGraphDiff } = useCommGraphDiff(commGraphDiffId || "");
  const cyRef = useRef<HTMLDivElement | null>(null);

  cytoscape.use(fcose);

  useEffect(() => {
    if (!cyRef.current) return;

    const elements: ElementsDefinition = {
      nodes: graph.nodes.map((node: CommGraphNode) => ({
        data: {
          id: node.nodeName,
          label: node.nodeName,
        },
        group: "nodes",
      })),
      edges: (commGraphDiff ? commGraphDiff.changedLinks : graph.links).map(
        (link: CommGraphLink | ChangedCommGraphLink) => ({
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
  }, [graph, commGraphDiff]);

  if (commGraphDiffId === "None") return <></>;
  return <div ref={cyRef} className="w-full h-[90%]" />;
};

export default Graph;
