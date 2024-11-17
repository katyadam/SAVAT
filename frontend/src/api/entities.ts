import { ANALYSIS_INPUTS_PREFIX } from "./analysisInputs";
import { axiosInstance } from "./config";

export type FieldAnnotation = {
    annotation: string;
}

export type Field = {
    fieldName: string;
    fieldFullName: string;
    fieldType: string;
    fieldAnnotations: FieldAnnotation[];
    fieldIsReference: boolean;
    fieldEntityRefName: string;
    isCollection: boolean;
}

export type GraphNode = {
    msName: string;
    nodeName: string;
    nodeFullName: string;
    fields: Field[];
}

export type Link = {
    source: string;
    target: string;
    msSource: string;
    msTarget: string;
    sourceMultiplicity: string;
    targetMultiplicity: string;
}

export type GraphData = {
    nodes: GraphNode[];
    links: Link[];
}

async function getEntities(id: string): Promise<GraphData> {
    const resp = await axiosInstance.get(`${ANALYSIS_INPUTS_PREFIX}/${id}/entities`)
    return resp.data;
}

const EntitiesApi = {
    getEntities,
};

export default EntitiesApi;