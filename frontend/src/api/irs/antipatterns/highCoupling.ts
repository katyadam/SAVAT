import { Graph, IREdge, Microservice } from "../types";


export const getMicroservicesBasedOnCouplingIndex = (graph: Graph, index: number): Microservice[] => {
    return graph.nodes.filter((ms) => getMSCouplingIndex(ms, graph.edges) >= index);
}

const getMSCouplingIndex = (ms: Microservice, irEdges: IREdge[]): number => {
    return irEdges
        .filter((edge) => edge.sourceMs === ms.name || edge.targetMs === ms.name)
        .length;
}