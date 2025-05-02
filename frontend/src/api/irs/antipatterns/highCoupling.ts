import IRApi from "../api";
import { Graph, IREdge, Microservice } from "../types";


export const getMicroservicesBasedOnCouplingIndex = (graph: Graph, index: number): Microservice[] => {
    return graph.nodes.filter((ms) => getMSCouplingIndex(ms, graph.edges) >= index);
}

const getMSCouplingIndex = (ms: Microservice, irEdges: IREdge[]): number => {
    return irEdges
        .filter((edge) => edge.sourceMsId === IRApi.getMsId(ms) || edge.targetMsId === IRApi.getMsId(ms))
        .length;
}