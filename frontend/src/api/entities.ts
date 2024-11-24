import { log } from "console";
import { ANALYSIS_INPUTS_PREFIX } from "./analysisInputs";
import { axiosInstance } from "./config";

export type FieldAnnotation = {
    annotation: string;
}

export type EntityField = {
    fieldName: string;
    fieldFullName: string;
    fieldType: string;
    fieldAnnotations: FieldAnnotation[];
    fieldIsReference: boolean;
    fieldEntityRefName: string;
    isCollection: boolean;
}

export type EntityNode = {
    msName: string;
    nodeName: string;
    nodeFullName: string;
    fields: EntityField[];
}

export type EntityLink = {
    source: string;
    target: string;
    msSource: string;
    msTarget: string;
    sourceMultiplicity: string;
    targetMultiplicity: string;
}

export type ChangedEntityLink = EntityLink & {
    type: ChangedEntityLinkType;
};

export enum ChangedEntityLinkType {
    SAME, ADDED, REMOVED, MODIFIED
}

export type GraphData = {
    nodes: EntityNode[];
    links: EntityLink[];
}

export type GraphDataChangedLinks = {
    nodes: EntityNode[];
    links: ChangedEntityLink[];
}

async function getEntities(id: string): Promise<GraphData> {
    const resp = await axiosInstance.get(`${ANALYSIS_INPUTS_PREFIX}/${id}/entities`)
    return resp.data;
}

const getChangedColor = (type: string): string => {
    switch (type) {
        case "SAME":
            return "black";
        case "ADDED":
            return "green";
        case "REMOVED":
            return "red";
        case "MODIFIED":
            return "blue";
        default:
            return "white";
    }
};


const EntitiesApi = {
    getEntities,
    getChangedColor
};

export default EntitiesApi;