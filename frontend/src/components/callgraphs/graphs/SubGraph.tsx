import cytoscape from "cytoscape";
import { FC, useEffect, useRef, useState } from "react";
import { ElementsDefinition } from "cytoscape";
// @ts-expect-error Necessary for compatibility with cytoscape-cise
import cise from "cytoscape-cise";
import {
  CallGraphCall,
  GenericCallGraph,
  TypeOfChange,
} from "@/api/callgraphs/types";
import { getCyInstance } from "./CytoscapeInstance";

type SubGraphType = {
  callGraph: GenericCallGraph;
  msColors: Map<string, string>;
};

const SubGraph: FC<SubGraphType> = ({ callGraph, msColors }) => {
  const cyRef = useRef<HTMLDivElement | null>(null);
  const [_selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [_selectedCall, setSelectedCall] = useState<string | null>(null);

  cytoscape.use(cise);

  useEffect(() => {
    if (cyRef.current) {
      const elements: ElementsDefinition = {
        nodes: callGraph.methods
          .filter((method) => method.bytecodeHash !== "null")
          .map((method) => ({
            data: {
              id: method.methodSignature,
              label: method.name || "Unnamed",
              parent: method.microservice,
              microservice: method.microservice,
              typeOfChange:
                "typeOfChange" in method
                  ? (method.typeOfChange as TypeOfChange)
                  : TypeOfChange.NONE,
            },
            group: "nodes",
          })),

        edges: callGraph.calls.map((call: CallGraphCall) => ({
          data: {
            id: `${call.httpMethod}:${call.source}__${call.target}`,
            source: call.source,
            target: call.target,
            label: call.httpMethod || "",
            isInterserviceCall: call.isInterserviceCall ? "true" : "false",
          },
          group: "edges",
        })),
      };

      const cyInstance = getCyInstance(cyRef, elements, msColors);

      cyInstance.on("tap", "node", (event) => {
        const node = event.target;
        setSelectedMethod(node.data("id"));
      });

      cyInstance.on("tap", "edge", (event) => {
        const edge = event.target;
        setSelectedCall(edge.data("id"));
      });

      return () => {
        cyInstance.destroy();
      };
    }
  }, [callGraph, msColors]);
  return (
    <div
      ref={cyRef}
      className="border rounded-md min-h-[600px] min-w-[800px]"
    />
  );
};

export default SubGraph;
