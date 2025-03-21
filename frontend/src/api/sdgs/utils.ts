import { ChangedLink, Link, Node, SDG } from "./types"

export const getLinkSignature = (link: Link | ChangedLink): string => {
    return `${link.source}__${link.target}:${"type" in link ? link.type : "SAME"}`
}

export const getRequestTypeColor = (type: string) => {
    switch (type) {
        case "GET":
            return "bg-yellow-200"
        case "POST":
            return "bg-green-300"
        case "PUT":
            return "bg-blue-300"
        case "DELETE":
            return "bg-red-300"
        default:
            return "black"
    }
}

export const getRequestTypeHoverColor = (type: string) => {
    switch (type) {
        case "GET":
            return "hover:bg-yellow-100"
        case "POST":
            return "bg-green-200"
        case "PUT":
            return "bg-blue-200"
        case "DELETE":
            return "bg-red-200"
        default:
            return "black"
    }
}


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