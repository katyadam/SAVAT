import { useEffect } from "react";
import { CY_COLOR_NEUTRAL, CY_COLOR_RED } from "@/api/utils";
import Cytoscape from "cytoscape";
import { IR, IREdge } from "@/api/irs/types";
import { getIRSubGraph } from "@/api/irs/graphFunctions";
import Antipatterns from "@/api/irs/antipatterns/antipatterns";

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
        const node = cy.getElementById(ms.name);
        if (node) {
          node.addClass("highlighted");
        }
      });
      subgraph.edges.forEach((iterEdge) => {
        const edge = cy.getElementById(
          `${iterEdge.sourceMs}__${iterEdge.targetMs}`
        );
        if (edge) {
          edge.addClass("highlighted");
        }
      });
    } else {
      ir.microservices.forEach((ms) => {
        const node = cy.getElementById(ms.name);
        if (node) {
          node.removeClass("highlighted");
        }
      });

      edges.forEach((iterEdge) => {
        const edge = cy.getElementById(
          `${iterEdge.sourceMs}__${iterEdge.targetMs}`
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
          const node = cy.getElementById(ms.name);
          if (node) {
            node.addClass("partOfCycle");
          }
        });
        graph.edges.forEach((iterEdge) => {
          const edge = cy.getElementById(
            `${iterEdge.sourceMs}__${iterEdge.targetMs}`
          );
          if (edge) {
            edge.addClass("partOfCycle");
          }
        });
      }
    } else {
      ir.microservices.forEach((ms) => {
        const node = cy.getElementById(ms.name);
        if (node) {
          node.removeClass("partOfCycle");
        }
      });

      edges.forEach((iterEdge) => {
        const edge = cy.getElementById(
          `${iterEdge.sourceMs}__${iterEdge.targetMs}`
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
      const node = cy.getElementById(ms.name);
      if (node) {
        node.style("background-color", CY_COLOR_NEUTRAL);
      }
    });
    const microservices = Antipatterns.getMicroservicesBasedOnCouplingIndex(
      { nodes: ir.microservices, edges: edges },
      threshold
    );
    console.log(microservices);
    microservices.forEach((ms) => {
      const node = cy.getElementById(ms.name);
      if (node) {
        node.style("background-color", CY_COLOR_RED);
      }
    });
  }, [threshold]);
};
