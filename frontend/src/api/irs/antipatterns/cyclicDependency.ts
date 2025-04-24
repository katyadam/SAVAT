import { Graph, IREdge } from "../types";

export const johnsonsAlgorithm = (graph: Graph): Graph[] => {
    const allCycles: string[][] = [];
    const blocked: Set<string> = new Set();
    const blockMap: Map<string, Set<string>> = new Map();
    const stack: string[] = [];

    const adjacency: Map<string, string[]> = new Map();
    for (const node of graph.nodes) {
        adjacency.set(node.name, []);
    }
    for (const edge of graph.edges) {
        adjacency.get(edge.sourceMs)?.push(edge.targetMs);
    }

    const unblock = (node: string) => {
        blocked.delete(node);
        const neighbors = blockMap.get(node);
        if (neighbors) {
            for (const neighbor of neighbors) {
                if (blocked.has(neighbor)) {
                    unblock(neighbor);
                }
            }
            blockMap.set(node, new Set());
        }
    };

    const circuit = (start: string, current: string): boolean => {
        let foundCycle = false;
        stack.push(current);
        blocked.add(current);

        for (const neighbor of adjacency.get(current) || []) {
            if (neighbor === start) {
                allCycles.push([...stack, start]);
                foundCycle = true;
            } else if (!blocked.has(neighbor)) {
                if (circuit(start, neighbor)) {
                    foundCycle = true;
                }
            }
        }

        if (foundCycle) {
            unblock(current);
        } else {
            for (const neighbor of adjacency.get(current) || []) {
                if (!blockMap.has(neighbor)) {
                    blockMap.set(neighbor, new Set());
                }
                blockMap.get(neighbor)!.add(current);
            }
        }

        stack.pop();
        return foundCycle;
    };

    const sortedNodes = [...graph.nodes.map(n => n.name)].sort();

    for (let i = 0; i < sortedNodes.length; i++) {
        const subgraphNodes = sortedNodes.slice(i);
        const subgraph = buildSubgraph(adjacency, subgraphNodes);

        for (const node of subgraphNodes) {
            adjacency.set(node, subgraph.get(node) || []);
        }

        const start = subgraphNodes[0];
        blocked.clear();
        blockMap.clear();
        circuit(start, start);
    }

    return allCycles.map(cycle => {
        const nodesSet = new Set(cycle);
        const nodes = graph.nodes.filter(n => nodesSet.has(n.name));

        const edges: IREdge[] = [];
        for (let i = 0; i < cycle.length - 1; i++) {
            edges.push({
                sourceMs: cycle[i],
                targetMs: cycle[i + 1],
                connections: [], // Ignored since we are only visualizing within the Graph, not within its details...
            });
        }

        return { nodes, edges };
    });
}

const buildSubgraph = (
    original: Map<string, string[]>,
    nodes: string[]
): Map<string, string[]> => {
    const nodeSet = new Set(nodes);
    const subgraph = new Map<string, string[]>();
    for (const node of nodes) {
        const neighbors = original.get(node) || [];
        subgraph.set(node, neighbors.filter(n => nodeSet.has(n)));
    }
    return subgraph;
}