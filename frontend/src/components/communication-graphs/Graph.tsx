import { FC, useEffect, useRef } from "react";
import Cytoscape, { ElementsDefinition } from "cytoscape";

import cytoscape from "cytoscape";
import fcose, { FcoseLayoutOptions } from "cytoscape-fcose";
import {
  CommGraph,
  CommGraphLink,
  CommGraphNode,
} from "@/api/communication-graphs/types";

type GraphType = {
  graph: CommGraph;
};

const Graph: FC<GraphType> = ({ graph }) => {
  const cyRef = useRef<HTMLDivElement | null>(null);

  cytoscape.use(fcose);

  useEffect(() => {
    if (cyRef.current) {
      const elements: ElementsDefinition = {
        nodes: graph.nodes.map((node: CommGraphNode) => ({
          data: {
            id: node.nodeName,
            label: node.nodeName, // Ensure label is set correctly
          },
          group: "nodes",
          style: {
            "background-color": "blue",
          },
        })),
        edges: graph.links.map((link: CommGraphLink) => ({
          data: {
            source: link.source,
            target: link.target,
          },
          group: "edges",
        })),
      };

      const layoutOptions: FcoseLayoutOptions = {
        name: "fcose",
        animate: true,
        fit: true,
        animationDuration: 0,
        nodeSeparation: 80,
        tilingPaddingHorizontal: 80,
        tilingPaddingVertical: 20,
      };

      const cy = Cytoscape({
        container: cyRef.current,
        elements,
        style: [
          {
            selector: "node",
            style: {
              shape: "round-octagon",
              width: "30",
              height: "30",
              label: "data(label)",
              "text-valign": "top",
              "text-halign": "center",
              color: "black",
              "font-size": "12px",
            },
          },
          {
            selector: "edge",
            style: {
              width: 5,
              "line-color": "#808080",
              "curve-style": "bezier",
              "target-arrow-color": "#808080",
              "target-arrow-shape": "triangle",
            },
          },
        ],
        layout: layoutOptions,
      });

      cy.on("tap", "node", (event) => {
        const node = event.target;

        const currentZoom = cy.zoom();
        const zoomIncrement = 0.2;
        const newZoom = currentZoom + zoomIncrement;

        cy.zoom({
          level: newZoom,
          renderedPosition: node.renderedPosition(),
        });
      });

      return () => {
        cy.destroy();
      };
    }
  }, [graph]);

  return <div ref={cyRef} className="w-[90%] h-[90%]" />;
};

export default Graph;
