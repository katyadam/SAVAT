import { FC, useEffect, useRef, useState } from "react";
import Cytoscape, { ElementsDefinition } from "cytoscape";
import cytoscape from "cytoscape";
import fcose, { FcoseLayoutOptions } from "cytoscape-fcose";
import {
  ChangedEntityLink,
  EntityNode,
  GraphDataChangedLinks,
} from "@/api/entities/types";
import { useEntitiesDiff } from "@/hooks/useEntity";
import { getMicroservicesColors } from "../generators/colorGenerator";
import { getChangedColor } from "@/api/utils";

type EntitiesDiffGraphType = {
  onNodeClick: (node: EntityNode) => void;
  graphData: GraphDataChangedLinks;
  entitiesDiffId: string | null;
};

const EntitiesDiffGraph: FC<EntitiesDiffGraphType> = ({
  onNodeClick,
  graphData,
  entitiesDiffId,
}) => {
  if (!entitiesDiffId || entitiesDiffId === "None") return <></>;

  const { data: entitiesDiff, isLoading } = useEntitiesDiff(entitiesDiffId);
  const cyRef = useRef<HTMLDivElement | null>(null);
  const [msColors, setMsColors] = useState<Map<string, string>>(
    getMicroservicesColors(graphData.nodes)
  );

  cytoscape.use(fcose);

  useEffect(() => {
    setMsColors(getMicroservicesColors(graphData.nodes));
  }, [graphData]);

  useEffect(() => {
    if (!cyRef.current || isLoading || !entitiesDiff) return;

    const elements: ElementsDefinition = {
      nodes: graphData.nodes.map((node: EntityNode) => ({
        data: {
          id: node.nodeName,
          label: node.nodeName,
        },
        group: "nodes",
        style: {
          "background-color": msColors.get(node.msName),
        },
      })),
      edges: entitiesDiff.changedLinks.map((link: ChangedEntityLink) => ({
        data: {
          source: link.source,
          target: link.target,
        },
        group: "edges",
        style: {
          "line-color": getChangedColor(link.type.toString()),
          "target-arrow-color": getChangedColor(link.type.toString()),
        },
      })),
    };

    const layoutOptions: FcoseLayoutOptions = {
      name: "fcose",
      animationDuration: 0,
      fit: true,
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
            "curve-style": "bezier",
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
      const res = graphData.nodes.find((node) => node.nodeName == nodeData.id);
      if (!res) {
        alert("This node doesn't exist!");
      } else {
        onNodeClick(res);
      }
    });

    return () => {
      cy.destroy();
    };
  }, [graphData, entitiesDiff, isLoading, msColors]);

  if (isLoading) {
    return <p>Loading graph...</p>;
  }

  return <div ref={cyRef} className="w-[90%] h-[90%]" />;
};

export default EntitiesDiffGraph;
