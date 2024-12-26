import { FC, useEffect, useRef } from "react";
import Cytoscape, { ElementsDefinition } from "cytoscape";
import cytoscape from "cytoscape";
import fcose, { FcoseLayoutOptions } from "cytoscape-fcose";
import {
  ChangedCommGraphLink,
  CommGraphNode,
  CommGraphWithChangedLinks,
} from "@/api/communication-graphs/types";
import { getChangedColor } from "@/api/utils";
import { useCommGraphDiff } from "@/hooks/useCommGraph";

type DiffGraphType = {
  graphDiff: CommGraphWithChangedLinks;
  commGraphDiffId: string | null;
};

const DiffGraph: FC<DiffGraphType> = ({ graphDiff, commGraphDiffId }) => {
  if (!commGraphDiffId || commGraphDiffId === "None") return <></>;

  const { data: commGraphDiff, isLoading } = useCommGraphDiff(commGraphDiffId);

  const cyRef = useRef<HTMLDivElement | null>(null);

  cytoscape.use(fcose);

  useEffect(() => {
    if (!cyRef.current || isLoading || !commGraphDiff) return;

    const elements: ElementsDefinition = {
      nodes: graphDiff.nodes.map((node: CommGraphNode) => ({
        data: {
          id: node.nodeName,
          label: node.nodeName,
        },
        group: "nodes",
        style: {
          "background-color": "blue",
        },
      })),
      edges: commGraphDiff.changedLinks.map((link: ChangedCommGraphLink) => ({
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

    return () => {
      cy.destroy();
    };
  }, [graphDiff, commGraphDiff, isLoading]);

  return <div ref={cyRef} className="w-full h-[90%]" />;
};

export default DiffGraph;
