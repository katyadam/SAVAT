import { CallGraphCall, CallGraphMethod, GenericCallGraph } from "./types";

const getAdjacents = (cg: GenericCallGraph, methodSignature: string): CallGraphCall[] => {
    return cg.calls
        .filter((call) => call.source === methodSignature);
}

export const getMaxSubgraphReachLevel = (callGraph: GenericCallGraph, initialMethodSignature: string) => {
    const visited = new Set<string>();
    const queue: ([string, number])[] = [];
    let maxLevel = 0;
    queue.push([initialMethodSignature, 0]);

    while (queue.length > 0) {
        const currNode: [string, number] | undefined = queue.shift();
        if (currNode) {
            const currMethodCalls: CallGraphCall[] = getAdjacents(callGraph, currNode?.[0]);
            for (const call of currMethodCalls) {
                if (!visited.has(call.target)) {
                    visited.add(call.target);
                    const nextLevel: number = currNode?.[1];
                    maxLevel = Math.max(nextLevel + 1, maxLevel);
                    queue.push([call.target, nextLevel + 1]);
                }
            }
        }
    }
    return maxLevel;
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
            const currMethodCalls: CallGraphCall[] = getAdjacents(callGraph, currNode?.[0]);
            for (const call of currMethodCalls) {
                const methodToAdd = methodsMap.get(call.target);
                if (!visited.has(call.target) && methodToAdd) {
                    methods.push(methodToAdd);
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