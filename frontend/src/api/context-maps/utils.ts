import { Link, Node } from "./types";

export const getNodeSignature = (node: Node): string => {
    return `${node.msName}__${node.nodeName}`
}

export const getLinkSignature = (link: Link): string => {
    return `${link.msSource}:${link.source}__${link.msTarget}:${link.target}`
}

export const indexContextMapNodes = (methods: Node[]): Map<string, Node> => {
    const nodesMap = new Map<string, Node>();
    methods.forEach(node => {
        nodesMap.set(getNodeSignature(node), node);
    });
    return nodesMap;
};

export const indexContextMapLinks = (calls: Link[]): Map<string, Link> => {
    const linksMap = new Map<string, Link>();
    calls.forEach(link => {
        linksMap.set(getLinkSignature(link), link);
    });
    return linksMap
}