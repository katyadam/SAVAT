import { axiosInstance } from "../config";
import { ChangedDto, ChangedLinksResponse, ChangeImpactAnalysisPayload, CIAContextMap, ContextMapFullDto, ContextMapOutputSimple, CreateContextMapRequest, Link, Summary } from "./types";

export const CONTEXT_MAPS_PREFIX = "/context-maps"
export const CONTEXT_MAPS_OUTPUTS_PREFIX = "/context-maps-outputs"


async function getContextMap(id: string): Promise<ContextMapFullDto> {
    const resp = await axiosInstance.get(`${CONTEXT_MAPS_PREFIX}/${id}`)
    return resp.data;
}

async function getContextMapChanges(id: string): Promise<ChangedDto[]> {
    const resp = await axiosInstance.get(`${CONTEXT_MAPS_PREFIX}/${id}/changes`)
    return resp.data;
}

async function getContextMapChange(id: string | null): Promise<ChangedDto> {
    const resp = await axiosInstance.get(`${CONTEXT_MAPS_PREFIX}/changes/${id}`)
    return resp.data;
}

async function getSummary(id: number): Promise<Summary> {
    const resp = await axiosInstance.get(`${CONTEXT_MAPS_PREFIX}/${id}/summary`);
    return resp.data;
}

async function getProjectContextMapOutputs(projectId: string): Promise<ContextMapOutputSimple[]> {
    const resp = await axiosInstance.get(`${CONTEXT_MAPS_OUTPUTS_PREFIX}/project/${projectId}`);
    return resp.data;
}

async function getContextMapOutputById(id: string): Promise<CIAContextMap> {
    const resp = await axiosInstance.get(`${CONTEXT_MAPS_OUTPUTS_PREFIX}/${id}`);
    return resp.data;
}

async function createContextMap(req: CreateContextMapRequest) {
    const resp = await axiosInstance.post(`${CONTEXT_MAPS_PREFIX}`, req);
    return resp.data;
}

async function compareContextMapsLinksManually(
    id: string,
    links: Link[]
): Promise<ChangedLinksResponse> {
    const resp = await axiosInstance.put(`${CONTEXT_MAPS_PREFIX}/${id}/compare`, {
        links: links
    })
    return resp.data;
}

async function compareContextMapsLinks(srcId: string, targetId: string): Promise<ChangedLinksResponse> {
    const resp = await axiosInstance.post(`${CONTEXT_MAPS_PREFIX}/compare`, {
        sourceId: srcId,
        targetId: targetId
    })
    return resp.data;
}

async function changeImpactAnalysis(ids: ChangeImpactAnalysisPayload): Promise<ContextMapOutputSimple> {
    const resp = await axiosInstance.post(`${CONTEXT_MAPS_OUTPUTS_PREFIX}/change-impact-analysis`, ids);
    return resp.data;
}

async function deleteContextMap(id: number) {
    const resp = await axiosInstance.delete(`${CONTEXT_MAPS_PREFIX}/${id}`);
    return resp.data;
}

async function deleteContextMapOutputById(id: number) {
    const resp = await axiosInstance.delete(`${CONTEXT_MAPS_OUTPUTS_PREFIX}/${id}`);
    return resp.data;
}

const ContextMapApi = {
    getContextMap,
    getContextMapChanges,
    getContextMapChange,
    getSummary,
    getProjectContextMapOutputs,
    getContextMapOutputById,
    createContextMap,
    compareContextMapsLinksManually,
    changeImpactAnalysis,
    deleteContextMap,
    deleteContextMapOutputById,
    compareContextMapsLinks
};

export default ContextMapApi;