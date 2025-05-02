import IRApi from "./api";
import { Endpoint, Graph, IREdge, Microservice, RESTCall } from "./types";

export const createIREdges = (microservices: Microservice[]): IREdge[] => {
    const endpointsMap = createEndpointsMap(getEndpoints(microservices));
    const restCalls = getRESTCalls(microservices);
    const collectedIREdges = new Map<string, IREdge>();

    restCalls.forEach((rc) => {
        if (rc.url) {
            const targetEndpoint = endpointsMap.get(rc.url);
            if (targetEndpoint) {
                const key = `${rc.msId}->${targetEndpoint.msId}`;
                const existingEdge = collectedIREdges.get(key);

                if (existingEdge) {
                    existingEdge.connections.push({
                        restCall: rc,
                        endpoint: targetEndpoint
                    });
                } else {
                    collectedIREdges.set(key, {
                        sourceMsId: rc.msId,
                        targetMsId: targetEndpoint.msId,
                        connections: [{
                            restCall: rc,
                            endpoint: targetEndpoint
                        }]
                    });
                }
            }
        }
    });

    return Array.from(collectedIREdges.values());
}

export const getIRSubGraph = (microservices: Microservice[], edges: IREdge[], initialMsId: string): Graph => {
    const msMap = new Map(microservices.map(ms => [IRApi.getMsId(ms), ms]));
    const collectedNodes: Microservice[] = msMap.has(initialMsId) ? [msMap.get(initialMsId)!] : [];
    const collectedEdges: IREdge[] = [];
    const visited = new Set<string>();
    const queue: string[] = [];
    queue.push(initialMsId);

    while (queue.length > 0) {
        const currNode: string | undefined = queue.shift();
        if (currNode && msMap.has(currNode)) {
            const currNodeEdges: IREdge[] = getMsEdges(edges, msMap.get(currNode)!);
            for (const edge of currNodeEdges) {
                if (!visited.has(edge.targetMsId)) {
                    collectedNodes.push(msMap.get(edge.targetMsId)!);
                    collectedEdges.push(edge);
                    visited.add(edge.targetMsId);
                    queue.push(edge.targetMsId);
                }
            }
        }
    }
    return { nodes: collectedNodes, edges: collectedEdges }
}

const createEndpointsMap = (endpoints: Endpoint[]): Map<string, Endpoint> => {
    const endpointsMap = new Map<string, Endpoint>();
    endpoints.forEach((endpoint) => {
        if (endpoint.url) {
            endpointsMap.set(endpoint.url.includes("{") ? endpoint.url.split("{")[0] + "{?}" : endpoint.url, endpoint);
        }
    });
    return endpointsMap;
}


const getEndpoints = (microservices: Microservice[]): Endpoint[] => {
    return microservices.flatMap((ms) => getMsEndpoints(ms));
}

export const getMsEndpoints = (ms: Microservice): Endpoint[] => {
    return ms.controllers.flatMap((controller) => {
        return controller.methods
            .filter((method) => "url" in method)
            .map((method) => ({ msId: IRApi.getMsId(ms), ...method }));
    });
}

const getRESTCalls = (microservices: Microservice[]): RESTCall[] => {
    return microservices.flatMap((ms) => getMsRESTCalls(ms));
}

export const getMsRESTCalls = (ms: Microservice): RESTCall[] => {
    return ms.services.flatMap((service) => {
        return service.methodCalls
            .filter((methodCall) => "url" in methodCall)
            .map((methodCall) => ({ msId: IRApi.getMsId(ms), ...methodCall }));
    });
}

export const getMsEdges = (edges: IREdge[], ms: Microservice): IREdge[] => {
    return edges
        .filter((edge) => edge.sourceMsId === IRApi.getMsId(ms));
}

export const getMsDependencies = (initialMs: Microservice, microservices: Microservice[], irEdges: IREdge[]): Microservice[] => {
    const msMap = new Map(microservices.map(ms => [IRApi.getMsId(ms), ms]));
    return irEdges
        .filter((irEdge) => irEdge.sourceMsId === IRApi.getMsId(initialMs) && msMap.has(irEdge.targetMsId))
        .map((irEdge) => msMap.get(irEdge.targetMsId)!);
}

export const getMsUsedBy = (initialMs: Microservice, microservices: Microservice[], irEdges: IREdge[]): Microservice[] => {
    const msMap = new Map(microservices.map(ms => [IRApi.getMsId(ms), ms]));
    return irEdges
        .filter((irEdge) => irEdge.targetMsId === IRApi.getMsId(initialMs) && msMap.has(irEdge.sourceMsId))
        .map((irEdge) => msMap.get(irEdge.sourceMsId)!);
}