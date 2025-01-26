import { FC, useEffect, useRef } from "react";
import Cytoscape, { ElementsDefinition } from "cytoscape";

import cytoscape from "cytoscape";
// @ts-ignore
import cise, { CiseLayoutOptions } from "cytoscape-cise";
import {
  CallGraph,
  CallGraphCall,
  CallGraphMethod,
} from "@/api/callgraphs/types";

type GraphType = {
  callGraph: CallGraph;
  showIsolatedNodes: boolean;
  msColors: Map<string, string>;
};

const Graph: FC<GraphType> = ({ callGraph, showIsolatedNodes, msColors }) => {
  const cyRef = useRef<HTMLDivElement | null>(null);

  const getNonIsolatedNodes = (
    nodes: CallGraphMethod[],
    links: CallGraphCall[]
  ): CallGraphMethod[] => {
    // TODO: extract node types and make this function general
    const linkedNodeNames = new Set<string>();

    links.forEach((link) => {
      linkedNodeNames.add(link.source);
      linkedNodeNames.add(link.target);
    });
    return nodes.filter((node) => linkedNodeNames.has(node.methodSignature));
  };

  cytoscape.use(cise);

  useEffect(() => {
    console.log(callGraph);
    if (cyRef.current) {
      const visibleNodes = getNonIsolatedNodes(
        callGraph.methods,
        callGraph.calls
      );
      const elements: ElementsDefinition = {
        nodes: (showIsolatedNodes ? visibleNodes : callGraph.methods)
          .filter((method) => method.bytecodeHash !== "null") // these methods dont have any calls
          .map((method: CallGraphMethod) => ({
            data: {
              id: method.methodSignature,
              label: method.name,
              parent: method.microservice,
            },
            group: "nodes",
            style: {
              "background-color": msColors.get(method.microservice),
            },
          })),
        edges: callGraph.calls.map((call: CallGraphCall) => ({
          data: {
            source: call.source,
            target: call.target,
            label: call.httpMethod,
          },
          group: "edges",
          style: {
            "line-color": call.isInterserviceCall ? "#ff4d4d" : "#4CAF50",
            "target-arrow-color": call.isInterserviceCall
              ? "#ff4d4d"
              : "#4CAF50",
          },
        })),
      };

      const layoutOptions: CiseLayoutOptions = {
        name: "cise",
        fit: true,
        clusters: (node: any) => node.data("id").split("/")[0],
        nodeSeparation: 30,
        padding: 10,
        clustering: true,
        nodeDimensionsIncludeLabels: true,
        maxIterations: 10000,
        clusterThreshold: 0.1,
        gravity: 0.5,
        direction: "horizontal",
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
              label: "data(label)",
              "text-rotation": "autorotate",
              "text-margin-y": -10,
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
  }, [callGraph, showIsolatedNodes]);

  return <div ref={cyRef} className="w-full h-full" />;
};

export default Graph;
