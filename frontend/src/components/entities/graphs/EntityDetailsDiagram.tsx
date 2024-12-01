import React, { useEffect, useRef } from "react";
import Cytoscape, { CoseLayoutOptions, ElementsDefinition } from "cytoscape";
import { GraphData, EntityNode, EntityLink } from "@/api/entities/types";

import cytoscape from "cytoscape";
import fcose, { FcoseLayoutOptions } from "cytoscape-fcose";

interface EntityDetailsDiagramProps {
  graphData: GraphData;
}

const EntityDetailsDiagram: React.FC<EntityDetailsDiagramProps> = ({
  graphData,
}) => {
  const cyRef = useRef<HTMLDivElement | null>(null);
  cytoscape.use(fcose);
  const formatNodeLabel = (node: EntityNode) => {
    let label = `Entity: ${node.nodeName}`;

    let fieldLabel = "";
    let maxSize = 0;
    node.fields.forEach((field) => {
      fieldLabel += "\n" + field.fieldName + ": " + field.fieldType;
      if ((field.fieldName + ": " + field.fieldType).length > maxSize) {
        maxSize = (field.fieldName + ": " + field.fieldType).length;
      }
    });
    if (maxSize != 0) label += "\n" + "-".repeat(maxSize + 20);
    return label + fieldLabel;
  };

  const getNonIsolatedNodes = (nodes: EntityNode[], links: EntityLink[]) => {
    const linkedNodeNames = new Set<string>();

    links.forEach((link) => {
      linkedNodeNames.add(link.source.nodeName);
      linkedNodeNames.add(link.target.nodeName);
    });
    return nodes;
    // return nodes.filter((node) => linkedNodeNames.has(node.nodeName));
  };

  useEffect(() => {
    if (cyRef.current) {
      const visibleNodes = getNonIsolatedNodes(
        graphData.nodes,
        graphData.links
      );

      const elements: ElementsDefinition = {
        nodes: visibleNodes.map((node: EntityNode) => ({
          data: {
            id: node.nodeName,
            label: formatNodeLabel(node),
          },
          group: "nodes",
        })),
        edges: graphData.links.map((link: EntityLink) => ({
          data: {
            source: link.source.nodeName,
            target: link.target.nodeName,
          },
          group: "edges",
        })),
      };
      const layoutOptions: FcoseLayoutOptions = {
        name: "fcose",
        animate: true,
        fit: true,
      };
      const cy = Cytoscape({
        container: cyRef.current,
        elements,
        style: [
          {
            selector: "node",
            style: {
              "background-color": "white",
              "border-color": "black",
              "border-width": "5",
              shape: "roundrectangle",
              label: "data(label)",
              width: "label",
              height: "label",
              "text-wrap": "wrap",
              "padding-left": "10",
              "text-justification": "left",
              "text-halign": "center",
              "text-valign": "center",
              "font-size": 12,
              "font-family": "Arial, sans-serif",
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
              "text-rotation": "autorotate",
            },
          },
        ],
        layout: layoutOptions,
      });

      cy.on("tap", "node", (event) => {
        const node = event.target;

        // Get the current zoom level and increase it
        const currentZoom = cy.zoom();
        const zoomIncrement = 0.2; // Increase zoom by this amount
        const newZoom = currentZoom + zoomIncrement;

        // Zoom in and center the graph on the clicked node
        cy.zoom({
          level: newZoom,
          renderedPosition: node.renderedPosition(),
        });
      });

      return () => {
        cy.destroy();
      };
    }
  }, [graphData]);

  return <div ref={cyRef} className="w-[90%] h-[90%]" />;
};

export default EntityDetailsDiagram;
