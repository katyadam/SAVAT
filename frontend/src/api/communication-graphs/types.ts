export type CommGraph = {
    nodes: CommGraphNode[],
    links: CommGraphLink[]
}

export type CommGraphNode = {
    nodeName: string,
    nodeType: string
}

export type CommGraphLink = {
    source: string,
    target: string,
    requests: CommGraphLinkRequest[]
}

export type CommGraphLinkRequest = {
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

export type ChangedCommGraphLink = CommGraphLink & {
    type: ChangedCommGraphLinkType;
};

export enum ChangedCommGraphLinkType {
    SAME, ADDED, REMOVED, MODIFIED
}

export type CommGraphWithChangedLinks = {
    nodes: CommGraphNode[];
    links: ChangedCommGraphLink[];
}

export type CommGraphDiff = {
    id: number;
    changedLinks: ChangedCommGraphLink[];
    createdAt: string;
}

export type CompareCommGraphLinksResponse = {
    changedLinks: ChangedCommGraphLink[]
}