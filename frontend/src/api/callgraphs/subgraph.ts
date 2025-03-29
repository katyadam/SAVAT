import { CallGraphCall, CallGraphMethod, GenericCallGraph } from "./types";

const getAdjacents = (cg: GenericCallGraph, methodSignature: string): CallGraphCall[] => {
    return cg.calls
        .filter((call) => call.source === methodSignature);
}

export const getSubgraph = (callGraph: GenericCallGraph, initialMethodSignature: string, level: number): GenericCallGraph => {
    const methodsMap = new Map(callGraph.methods.map(method => [method.methodSignature, method]));
    const methods: CallGraphMethod[] = methodsMap.has(initialMethodSignature) ? [methodsMap.get(initialMethodSignature)!] : [];
    const calls: CallGraphCall[] = [];
    const visited = new Set<string>();
    const queue: ([string, number])[] = [];
    queue.push([initialMethodSignature, 0]);

    while (queue.length > 0) {
        const currNode: [string, number] | undefined = queue.shift();
        if (currNode) {
            const currMethodCalls: CallGraphCall[] = getAdjacents(callGraph, currNode?.[0]); // can't be undefined -> guarded by while condition
            for (const call of currMethodCalls) {
                if (!visited.has(call.target)) {
                    methods.push(methodsMap.get(call.target)!);
                    calls.push(call);
                    visited.add(call.target);
                    const nextLevel: number = currNode?.[1];
                    if (nextLevel < level - 1)
                        queue.push([call.target, nextLevel + 1]);
                }
            }
        }
    }
    return { methods: methods, calls: calls }
}