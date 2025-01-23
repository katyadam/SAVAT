import { FC, useEffect, useRef, useState } from "react";
import Cytoscape, { ElementsDefinition } from "cytoscape";

import cytoscape from "cytoscape";
import cise, { CiseLayoutOptions } from "cytoscape-cise";
import {
  CallGraph,
  CallGraphCall,
  CallGraphMethod,
} from "@/api/callgraphs/types";
import { getMicroservicesColors } from "../generators/colorGenerator";

type GraphType = {
  callGraph: CallGraph;
};

const Graph: FC<GraphType> = ({ callGraph }) => {
  const cyRef = useRef<HTMLDivElement | null>(null);

  const [msColors, setMsColors] = useState<Map<string, string>>(
    getMicroservicesColors(callGraph.methods)
  );

  cytoscape.use(cise);

  useEffect(() => {
    setMsColors(getMicroservicesColors(callGraph.methods));
  }, [callGraph]);

  useEffect(() => {
    console.log(callGraph.methods);
    if (cyRef.current) {
      const elements: ElementsDefinition = {
        nodes: callGraph.methods
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
          },
          group: "edges",
          style: {
            "line-color": call.isInterserviceLink ? "#ff4d4d" : "#4CAF50",
            "target-arrow-color": call.isInterserviceLink
              ? "#ff4d4d"
              : "#4CAF50",
          },
        })),
      };

      const layoutOptions: CiseLayoutOptions = {
        name: "cise",
        fit: true,
        clusters: (node: any) => node.data("id").split("/")[0],
        nodeSeparation: 50,
        padding: 30,
        clustering: true,
        nodeDimensionsIncludeLabels: true,
        maxIterations: 10000,
        clusterThreshold: 0.8,
        gravity: 1,
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
  }, [callGraph]);

  return <div ref={cyRef} className="w-full h-[90%]" />;
};

export default Graph;
