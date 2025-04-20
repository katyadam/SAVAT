import { Endpoint, IREdge, Microservice, RESTCall } from "./types";

export const createIREdges = (microservices: Microservice[]): IREdge[] => {
    const endpointsMap = createEndpointsMap(getEndpoints(microservices));
    const restCalls = getRESTCalls(microservices);
    const collectedIREdges: Set<IREdge> = new Set();

    restCalls.forEach((rc) => {
        const targetEndpoint = endpointsMap.get(rc.targetURI);
        if (targetEndpoint) {
            collectedIREdges.add({
                sourceMs: rc.microservice,
                targetMs: targetEndpoint.microservice
            });
        }
    });

    return [...collectedIREdges];
}

const createEndpointsMap = (endpoints: Endpoint[]): Map<string, Endpoint> => {
    const endpointsMap = new Map<string, Endpoint>();
    endpoints.forEach((endpoint) => endpointsMap.set(endpoint.URI, endpoint));
    return endpointsMap;
}


const getEndpoints = (microservices: Microservice[]): Endpoint[] => {
    return microservices.flatMap((ms) => ms.controllers.flatMap((controller) => {
        return controller.methods
            .filter((method) => "url" in method)
            .map((method) => ({ URI: method.url || "", method: method.name, microservice: ms.name }));
    }));
}

const getRESTCalls = (microservices: Microservice[]): RESTCall[] => {
    return microservices.flatMap((ms) => ms.services.flatMap((service) => {
        return service.methodCalls
            .filter((methodCall) => "url" in methodCall)
            .map((methodCall) => ({ targetURI: methodCall.url || "", method: methodCall.calledFrom, microservice: ms.name }));
    }));
}