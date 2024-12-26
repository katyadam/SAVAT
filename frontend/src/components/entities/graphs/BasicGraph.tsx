import { FC, useEffect, useRef, useState } from "react";
import Cytoscape, { ElementsDefinition } from "cytoscape";
import { GraphData, EntityNode, EntityLink } from "@/api/entities/types";

import cytoscape from "cytoscape";
import fcose, { FcoseLayoutOptions } from "cytoscape-fcose";
import { getMicroservicesColors } from "../generators/colorGenerator";

type BasicGraphType = {
  onNodeClick: (node: EntityNode) => void;
  graphData: GraphData;
  showIsolatedNodes: boolean;
};

const BasicGraph: FC<BasicGraphType> = ({
  graphData,
  onNodeClick,
  showIsolatedNodes,
}) => {
  const cyRef = useRef<HTMLDivElement | null>(null);
  const [msColors, setMsColors] = useState<Map<string, string>>(
    getMicroservicesColors(graphData.nodes)
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
    setMsColors(getMicroservicesColors(graphData.nodes));
  }, [graphData]);

  useEffect(() => {
    if (cyRef.current) {
      const visibleNodes = getNonIsolatedNodes(
        graphData.nodes,
        graphData.links
      );

      const elements: ElementsDefinition = {
        nodes: (showIsolatedNodes ? graphData.nodes : visibleNodes).map(
          (node: EntityNode) => ({
            data: {
              id: node.nodeName,
              label: node.nodeName, // Ensure label is set correctly
            },
            group: "nodes",
            style: {
              "background-color": msColors.get(node.msName),
            },
          })
        ),
        edges: graphData.links.map((link: EntityLink) => ({
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
              width: "20",
              height: "20",
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

      cy.on("cxttap", "node", (event) => {
        const nodeData = event.target.data();
        const res = graphData.nodes.find(
          (node) => node.nodeName == nodeData.id
        );
        if (!res) {
          alert("This node doesn't exist!");
        } else {
          onNodeClick(res);
        }
      });

      return () => {
        cy.destroy();
      };
    }
  }, [graphData, showIsolatedNodes]);

  return <div ref={cyRef} className="w-full h-[90%]" />;
};

export default BasicGraph;
