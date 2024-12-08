import {
  ChangedEntityLink,
  EntityNode,
  GraphDataChangedLinks,
} from "@/api/entities/types";
import Cytoscape, { ElementsDefinition } from "cytoscape";
import cytoscape from "cytoscape";
import fcose, { FcoseLayoutOptions } from "cytoscape-fcose";
import { FC, useEffect, useRef, useState } from "react";
import { getMicroservicesColors } from "../generators/colorGenerator";
import EntitiesApi from "@/api/entities/entities";

type ComparedGraphType = {
  onNodeClick: (node: EntityNode) => void;
  graphData: GraphDataChangedLinks;
};

const ComparedGraph: FC<ComparedGraphType> = ({ onNodeClick, graphData }) => {
  const cyRef = useRef<HTMLDivElement | null>(null);
  const [msColors, setMsColors] = useState<Map<string, string>>(
    getMicroservicesColors(graphData.nodes)
  );

  cytoscape.use(fcose);

  useEffect(() => {
    setMsColors(getMicroservicesColors(graphData.nodes));
  }, [graphData]);

  useEffect(() => {
    console.log(graphData);

    if (cyRef.current) {
      const elements: ElementsDefinition = {
        nodes: graphData.nodes.map((node: EntityNode) => ({
          data: {
            id: node.nodeName,
            label: node.nodeName, // Ensure label is set correctly
          },
          group: "nodes",
          style: {
            "background-color": msColors.get(node.msName),
            shape: "round-octagon",
            width: "30",
            height: "30",
            label: "data(label)",
            "text-valign": "top",
            "text-halign": "center",
            color: "black",
            "font-size": "12px",
          },
        })),
        edges: graphData.links.map((link: ChangedEntityLink) => ({
          data: {
            source: link.source,
            target: link.target,
          },
          group: "edges",
          style: {
            "background-color": EntitiesApi.getChangedColor(
              link.type.toString()
            ),
            width: 5,
            "line-color": "#808080",
            "curve-style": "bezier",
            "target-arrow-color": "#808080",
            "target-arrow-shape": "triangle",
          },
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
  }, [graphData]);

  return <div ref={cyRef} className="w-[90%] h-[90%]" />;
};

export default ComparedGraph;
