import { useEffect } from "react";
import { CY_COLOR_NEUTRAL, CY_COLOR_RED } from "@/api/utils";
import Cytoscape from "cytoscape";
import { IR, IREdge } from "@/api/irs/types";
import { getIRSubGraph } from "@/api/irs/graphFunctions";
import Antipatterns from "@/api/irs/antipatterns/antipatterns";
import IRApi from "@/api/irs/api";

export const useIRHighlight = (
  cy: Cytoscape.Core | null,
  ir: IR | null,
  edges: IREdge[],
  selectedNode: string | null
) => {
  useEffect(() => {
    if (!cy || !ir) return;
    if (selectedNode) {
      const subgraph = getIRSubGraph(ir.microservices, edges, selectedNode);
      subgraph.nodes.forEach((ms) => {
        const node = cy.getElementById(IRApi.getMsId(ms));
        if (node) {
          node.addClass("highlighted");
        }
      });
      subgraph.edges.forEach((iterEdge) => {
        const edge = cy.getElementById(
          `${iterEdge.sourceMsId}__${iterEdge.targetMsId}`
        );
        if (edge) {
          edge.addClass("highlighted");
        }
      });
    } else {
      ir.microservices.forEach((ms) => {
        const node = cy.getElementById(IRApi.getMsId(ms));
        if (node) {
          node.removeClass("highlighted");
        }
      });

      edges.forEach((iterEdge) => {
        const edge = cy.getElementById(
          `${iterEdge.sourceMsId}__${iterEdge.targetMsId}`
        );
        if (edge) {
          edge.removeClass("highlighted");
        }
      });
    }
  }, [selectedNode]);
};

export const useIRCyclesHighlight = (
  cy: Cytoscape.Core | null,
  ir: IR | null,
  edges: IREdge[],
  doHighlight: boolean
) => {
  useEffect(() => {
    if (!cy || !ir) return;
    if (doHighlight) {
      const cycles = Antipatterns.johnsonsAlgorithm({
        nodes: ir.microservices,
        edges: edges,
      });
      for (const graph of cycles) {
        graph.nodes.forEach((ms) => {
          const node = cy.getElementById(IRApi.getMsId(ms));
          if (node) {
            node.addClass("partOfCycle");
          }
        });
        graph.edges.forEach((iterEdge) => {
          const edge = cy.getElementById(
            `${iterEdge.sourceMsId}__${iterEdge.targetMsId}`
          );
          if (edge) {
            edge.addClass("partOfCycle");
          }
        });
      }
    } else {
      ir.microservices.forEach((ms) => {
        const node = cy.getElementById(IRApi.getMsId(ms));
        if (node) {
          node.removeClass("partOfCycle");
        }
      });

      edges.forEach((iterEdge) => {
        const edge = cy.getElementById(
          `${iterEdge.sourceMsId}__${iterEdge.targetMsId}`
        );
        if (edge) {
          edge.removeClass("partOfCycle");
        }
      });
    }
  }, [doHighlight]);
};

export const useIRCouplingHighlight = (
  cy: Cytoscape.Core | null,
  ir: IR | null,
  edges: IREdge[],
  threshold: number
) => {
  useEffect(() => {
    if (!cy || !ir) return;
    ir.microservices.forEach((ms) => {
      const node = cy.getElementById(IRApi.getMsId(ms));
      if (node) {
        node.style("background-color", CY_COLOR_NEUTRAL);
      }
    });
    const microservices = Antipatterns.getMicroservicesBasedOnCouplingIndex(
      { nodes: ir.microservices, edges: edges },
      threshold
    );
    microservices.forEach((ms) => {
      const node = cy.getElementById(IRApi.getMsId(ms));
      if (node) {
        node.style("background-color", CY_COLOR_RED);
      }
    });
  }, [threshold]);
};

export const useHighlightAfterLookup = (
  cy: Cytoscape.Core | null,
  msId: string | null,
  ir: IR | null,
  removeLookup: () => void
) => {
  useEffect(() => {
    if (!cy || !ir || !msId) return;
    const node = cy.getElementById(msId);
    if (node) {
      cy.animate({
        fit: { padding: 300, eles: node },
        duration: 500,
      });
    }
    removeLookup();
  }, [msId, cy]);
};
