import cytoscape from "cytoscape";
import { FC, useEffect, useRef } from "react";
import { ElementsDefinition } from "cytoscape";
// @ts-expect-error Necessary for compatibility with cytoscape-cise
import cise from "cytoscape-cise";
import { getCyInstance } from "./CytoscapeInstance";
import { Graph, IREdge } from "@/api/irs/types";
import IRApi from "@/api/irs/api";
import { useIRMsReach } from "@/context/ir/IRMsReachContext";

type SubGraphType = {
  graph: Graph;
};

const SubGraph: FC<SubGraphType> = ({ graph }) => {
  const cyRef = useRef<HTMLDivElement | null>(null);

  const { irMsReachState } = useIRMsReach();

  cytoscape.use(cise);

  useEffect(() => {
    if (cyRef.current) {
      const elements: ElementsDefinition = {
        nodes: graph.nodes.map((ms) => ({
          data: {
            id: IRApi.getMsId(ms),
            label: ms.name || "Unnamed",
          },
          group: "nodes",
        })),

        edges: graph.edges.map((edge: IREdge) => ({
          data: {
            id: `${edge.sourceMsId}__${edge.targetMsId}`,
            source: edge.sourceMsId,
            target: edge.targetMsId,
          },
          group: "edges",
        })),
      };

      const cyInstance = getCyInstance(cyRef, elements);
      if (irMsReachState?.msId) {
        const targetNode = cyInstance.getElementById(irMsReachState.msId);
        if (targetNode) {
          targetNode.addClass("initialSubgraphNode");
        }
      }
      return () => {
        cyInstance.destroy();
      };
    }
  }, [graph]);
  return (
    <div
      ref={cyRef}
      className="border rounded-md min-h-[600px] min-w-[800px]"
    />
  );
};

export default SubGraph;
