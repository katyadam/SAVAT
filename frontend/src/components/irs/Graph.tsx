import { FC, useEffect, useRef, useState } from "react";
import Cytoscape, { ElementsDefinition } from "cytoscape";

// @ts-expect-error Necessary for compatibility with cytoscape-cise
import cise from "cytoscape-cise";
import cytoscape from "cytoscape";
import { getCyInstance } from "./CytoscapeInstance";
import { IR, IREdge } from "@/api/irs/types";
import { useIRCyclesHighlight, useIRHighlight } from "@/hooks/useGraphEffects";

type GraphType = {
  ir: IR;
  irEdges: IREdge[];
  setClickedNode: (arg: string) => void;
  highlightCycles: boolean;
};

const Graph: FC<GraphType> = ({
  ir,
  irEdges,
  setClickedNode,
  highlightCycles,
}) => {
  const cyRef = useRef<HTMLDivElement | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
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

        edges: irEdges.map((edge) => ({
          data: {
            id: `${edge.sourceMs}__${edge.targetMs}`,
            source: edge.sourceMs,
            target: edge.targetMs,
          },
          group: "edges",
        })),
      };

      const cyInstance = getCyInstance(cyRef, elements);
      setCy(cyInstance);

      cyInstance.on("mouseover", "node", (event) => {
        setHoveredNode(event.target.data().id);
      });

      cyInstance.on("mouseout", "node", () => {
        setHoveredNode(null);
      });

      cyInstance.on("tap", "node", (event) => {
        setClickedNode(event.target.data().id);
      });

      return () => {
        cyInstance.destroy();
      };
    }
  }, [ir]);

  useIRHighlight(cy, ir, irEdges, hoveredNode);
  useIRCyclesHighlight(cy, ir, irEdges, highlightCycles);

  return ir.microservices.length > 0 ? (
    <div ref={cyRef} className="w-full h-full relative z-0"></div>
  ) : (
    <p className="m-5">The provided call graph does not contain any nodes!</p>
  );
};

export default Graph;
