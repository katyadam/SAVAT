import { Link, Node, SDG } from "./types"

const getAdjacents = (sdg: SDG, nodeId: string): Link[] => {
    return sdg.links
        .filter((link) => link.source === nodeId);
}


export const getSubgraph = (sdg: SDG, initialNodeId: string): SDG => {
    const nodesMap = new Map(sdg.nodes.map(node => [node.nodeName, node]));
    const nodes: Node[] = nodesMap.has(initialNodeId) ? [nodesMap.get(initialNodeId)!] : [];
    const links: Link[] = [];
    const visited = new Set<string>();
    const queue: string[] = [];
    queue.push(initialNodeId);

    while (queue.length > 0) {
        const currNode: string | undefined = queue.shift(); // can't be undefined -> guarded by while condition
        const currNodeLinks: Link[] = getAdjacents(sdg, currNode!);
        for (const link of currNodeLinks) {
            if (!visited.has(link.target)) {
                nodes.push(nodesMap.get(link.target)!);
                links.push(link);
                visited.add(link.target);
                queue.push(link.target);
            }
        }
    }
    return { nodes: nodes, links: links }
}