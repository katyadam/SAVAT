export type SDG = {
    nodes: Node[],
    links: Link[]
}

export type SDGDto = {
    id: number;
    projectId: number;
    version: string;
    commitHash: string;
    createdAt: string
}

export type CreateSDGRequest = {
    projectId: number;
    version: string;
    commitHash: string;
    sdg: SDG;
}

export type Node = {
    nodeName: string,
    nodeType: string
}

export type Link = {
    source: string,
    target: string,
    requests: LinkRequest[]
}

export type LinkRequest = {
    type: string;
    uri: string;
    requestReturn: string;
    endpointFunction: string;
    endpointMsName: string;
    targetEndpointUri: string;
    isCollection: boolean;
    parentMethod: string;
    msName: string;
    restCallInClassName: string;
};

export type ChangedLink = Link & {
    type: ChangedLinkType;
};

export enum ChangedLinkType {
    SAME, ADDED, REMOVED, MODIFIED
}

export type SDGWithChangedLinks = {
    nodes: Node[];
    links: ChangedLink[];
}

export type ChangedDto = {
    id: number;
    changedLinks: ChangedLink[];
    createdAt: string;
}

export type ChangedLinksResponse = {
    changedLinks: ChangedLink[]
}

export type Summary = {
    totalChangedSdgs: number;
}