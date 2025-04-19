import { FC, useEffect, useRef, useState } from "react";
import Cytoscape, { ElementsDefinition } from "cytoscape";
// @ts-expect-error Necessary for compatibility with cytoscape-cise
import cise from "cytoscape-cise";
import cytoscape from "cytoscape";
import { getCyInstance } from "./CytoscapeInstance";
import { IR } from "@/api/irs/types";

type GraphType = {
  ir: IR;
  msColors: Map<string, string>;
};

const Graph: FC<GraphType> = ({ ir, msColors }) => {
  const cyRef = useRef<HTMLDivElement | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [selectedCall, setSelectedCall] = useState<string | null>(null);
  const [cy, setCy] = useState<Cytoscape.Core | null>(null);

  cytoscape.use(cise);

  useEffect(() => {
    if (cyRef.current) {
      const elements: ElementsDefinition = {
        nodes: ir.microservices.map((ms) => ({
          data: {
            id: ms.name,
            label: ms.name || "Unnamed",
          },
          group: "nodes",
        })),

        edges: [],
      };

      const cyInstance = getCyInstance(cyRef, elements, msColors);
      setCy(cyInstance);

      cyInstance.on("tap", "node", (event: any) => {
        const node = event.target;
        setSelectedMethod(node.data("id"));
      });

      cyInstance.on("tap", "edge", (event: any) => {
        const edge = event.target;
        setSelectedCall(edge.data("id"));
      });

      return () => {
        cyInstance.destroy();
      };
    }
  }, [ir]);

  return ir.microservices.length > 0 ? (
    <div ref={cyRef} className="w-full h-full relative z-0"></div>
  ) : (
    <p className="m-5">The provided call graph does not contain any nodes!</p>
  );
};

export default Graph;
