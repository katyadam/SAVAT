import { FC, useEffect, useRef, useState } from "react";
import Cytoscape, { ElementsDefinition } from "cytoscape";

// @ts-expect-error Necessary for compatibility with cytoscape-cise
import cise from "cytoscape-cise";
import cytoscape from "cytoscape";
import { getCyInstance } from "./CytoscapeInstance";
import { IR, IREdge } from "@/api/irs/types";
import {
  useHighlightAfterLookup,
  useIRCouplingHighlight,
  useIRCyclesHighlight,
  useIRHighlight,
} from "@/hooks/useIRGraphEffects";
import { useIRMicroserviceLookup } from "@/context/ir/IRMicroserviceLookupContext";
import IRApi from "@/api/irs/api";

type GraphType = {
  ir: IR;
  irEdges: IREdge[];
  setClickedNode: (arg: string) => void;
  highlightCycles: boolean;
  couplingThreshold: number;
};

const Graph: FC<GraphType> = ({
  ir,
  irEdges,
  setClickedNode,
  highlightCycles,
  couplingThreshold,
}) => {
  const cyRef = useRef<HTMLDivElement | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [cy, setCy] = useState<Cytoscape.Core | null>(null);
  const { irMicroserviceLookupState, irMicroserviceLookupDispatch } =
    useIRMicroserviceLookup();

  cytoscape.use(cise);
  useEffect(() => {
    if (cyRef.current) {
      const elements: ElementsDefinition = {
        nodes: ir.microservices.map((ms) => ({
          data: {
            id: IRApi.getMsId(ms),
            label: ms.name || "Unnamed",
          },
          group: "nodes",
        })),

        edges: irEdges.map((edge) => ({
          data: {
            id: `${edge.sourceMsId}__${edge.targetMsId}`,
            source: edge.sourceMsId,
            target: edge.targetMsId,
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
  useIRCouplingHighlight(cy, ir, irEdges, couplingThreshold);
  useHighlightAfterLookup(cy, irMicroserviceLookupState.msId, ir, () =>
    irMicroserviceLookupDispatch({ type: "REMOVE_LOOKUP" })
  );
  return ir.microservices.length > 0 ? (
    <div ref={cyRef} className="w-full h-full relative z-0"></div>
  ) : (
    <p className="m-5">The provided call graph does not contain any nodes!</p>
  );
};

export default Graph;
