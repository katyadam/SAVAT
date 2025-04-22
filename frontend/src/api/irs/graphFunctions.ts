import { Endpoint, IREdge, Microservice, RESTCall } from "./types";

export const createIREdges = (microservices: Microservice[]): IREdge[] => {
    const endpointsMap = createEndpointsMap(getEndpoints(microservices));
    const restCalls = getRESTCalls(microservices);
    const collectedIREdges = new Map<string, IREdge>();

    restCalls.forEach((rc) => {
        const targetEndpoint = endpointsMap.get(rc.targetURI);
        if (targetEndpoint) {
            const key = `${rc.microservice}->${targetEndpoint.microservice}`;
            collectedIREdges.set(key, {
                sourceMs: rc.microservice,
                targetMs: targetEndpoint.microservice
            });
        }
    });

    return Array.from(collectedIREdges.values());
}

export const getIRSubGraph = (microservices: Microservice[], edges: IREdge[], initialMs: string) => {
    const nodesMap = new Map(microservices.map(node => [node.name, node]));
    const collectedNodes: Microservice[] = nodesMap.has(initialMs) ? [nodesMap.get(initialMs)!] : [];
    const collectedEdges: IREdge[] = [];
    const visited = new Set<string>();
    const queue: string[] = [];
    queue.push(initialMs);

    while (queue.length > 0) {
        const currNode: string | undefined = queue.shift(); // can't be undefined -> guarded by while condition
        const currNodeEdges: IREdge[] = getAdjacents(edges, currNode!);
        for (const edge of currNodeEdges) {
            if (!visited.has(edge.targetMs)) {
                collectedNodes.push(nodesMap.get(edge.targetMs)!);
                collectedEdges.push(edge);
                visited.add(edge.targetMs);
                queue.push(edge.targetMs);
            }
        }
    }
    return { nodes: collectedNodes, links: collectedEdges }
}

const createEndpointsMap = (endpoints: Endpoint[]): Map<string, Endpoint> => {
    const endpointsMap = new Map<string, Endpoint>();
    endpoints.forEach((endpoint) => endpointsMap.set(endpoint.URI, endpoint));
    return endpointsMap;
}


const getEndpoints = (microservices: Microservice[]): Endpoint[] => {
    return microservices.flatMap((ms) => getMsEndpoints(ms));
}

export const getMsEndpoints = (ms: Microservice): Endpoint[] => {
    return ms.controllers.flatMap((controller) => {
        return controller.methods
            .filter((method) => "url" in method)
            .map((method) => ({ URI: method.url || "", method: method.name, microservice: ms.name }));
    });
}

const getRESTCalls = (microservices: Microservice[]): RESTCall[] => {
    return microservices.flatMap((ms) => getMsRESTCalls(ms));
}

export const getMsRESTCalls = (ms: Microservice): RESTCall[] => {
    return ms.services.flatMap((service) => {
        return service.methodCalls
            .filter((methodCall) => "url" in methodCall)
            .map((methodCall) => ({ targetURI: methodCall.url || "", method: methodCall.calledFrom, microservice: ms.name }));
    });
}

const getAdjacents = (edges: IREdge[], ms: string): IREdge[] => {
    return edges
        .filter((edge) => edge.sourceMs === ms);
}

export const getMsDependencies = (ms: Microservice, irEdges: IREdge[]): string[] => {
    return irEdges
        .filter((irEdge) => irEdge.sourceMs === ms.name)
        .map((irEdge) => irEdge.targetMs);
}

export const getMsUsedBy = (ms: Microservice, irEdges: IREdge[]): string[] => {
    return irEdges
        .filter((irEdge) => irEdge.targetMs === ms.name)
        .map((irEdge) => irEdge.sourceMs);
}