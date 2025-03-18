import { axiosInstance } from "../config";
import { ChangedDto, ChangedLinksResponse, ChangeImpactAnalysisPayload, ContextMap, CreateContextMapRequest, Link, Summary } from "./types";

export const CONTEXT_MAPS_PREFIX = "/context-maps"
export const CONTEXT_MAPS_OUTPUTS_PREFIX = "/context-maps-outputs"


async function getContextMap(id: string): Promise<ContextMap> {
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

async function getProjectContextMapOutputs(projectId: string) {
    const resp = await axiosInstance.get(`${CONTEXT_MAPS_OUTPUTS_PREFIX}/project/${projectId}`);
    return resp.data;
}

async function getContextMapOutputById(id: string) {
    const resp = await axiosInstance.get(`${CONTEXT_MAPS_OUTPUTS_PREFIX}/${id}`);
    return resp.data;
}

async function createContextMap(req: CreateContextMapRequest) {
    const resp = await axiosInstance.post(`${CONTEXT_MAPS_PREFIX}`, req);
    return resp.data;
}

async function compareContextMapsLinks(
    id: string,
    links: Link[]
): Promise<ChangedLinksResponse> {
    const resp = await axiosInstance.put(`${CONTEXT_MAPS_PREFIX}/${id}/compare`, {
        links: links
    })
    return resp.data;
}

async function changeImpactAnalysis(ids: ChangeImpactAnalysisPayload) {
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
    compareContextMapsLinks,
    changeImpactAnalysis,
    deleteContextMap,
    deleteContextMapOutputById
};

export default ContextMapApi;