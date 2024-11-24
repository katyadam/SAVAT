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

export type ChangedEntityLink = {
    link: EntityLink,
    type: ChangedEntityLinkType
}

export enum ChangedEntityLinkType {
    SAME, ADDED, REMOVED, MODIFIED
}

export type GraphData = {
    nodes: EntityNode[];
    links: EntityLink[];
}

async function getEntities(id: string): Promise<GraphData> {
    const resp = await axiosInstance.get(`${ANALYSIS_INPUTS_PREFIX}/${id}/entities`)
    return resp.data;
}

const EntitiesApi = {
    getEntities,
};

export default EntitiesApi;