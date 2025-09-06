import { ciaAI } from "../config";
import { ChangedDto, ChangedLinksResponse, ChangeImpactAnalysisPayload, ContextMapFullDto, ContextMapOutputDto, ContextMapOutputFullDto, CreateContextMapRequest, Link, Summary } from "./types";

export const CONTEXT_MAPS_PREFIX = "/context-maps"
export const CONTEXT_MAPS_OUTPUTS_PREFIX = "/context-maps-outputs"


async function getContextMap(id: string): Promise<ContextMapFullDto> {
    const resp = await ciaAI.get(`${CONTEXT_MAPS_PREFIX}/${id}`)
    return resp.data;
}

async function getContextMapChanges(id: string): Promise<ChangedDto[]> {
    const resp = await ciaAI.get(`${CONTEXT_MAPS_PREFIX}/${id}/changes`)
    return resp.data;
}

async function getContextMapChange(id: string | null): Promise<ChangedDto> {
    const resp = await ciaAI.get(`${CONTEXT_MAPS_PREFIX}/changes/${id}`)
    return resp.data;
}

async function getSummary(id: number): Promise<Summary> {
    const resp = await ciaAI.get(`${CONTEXT_MAPS_PREFIX}/${id}/summary`);
    return resp.data;
}

async function getProjectContextMapOutputs(projectId: string): Promise<ContextMapOutputDto[]> {
    const resp = await ciaAI.get(`${CONTEXT_MAPS_OUTPUTS_PREFIX}/project/${projectId}`);
    return resp.data;
}

async function getContextMapOutputById(id: string): Promise<ContextMapOutputFullDto> {
    const resp = await ciaAI.get(`${CONTEXT_MAPS_OUTPUTS_PREFIX}/${id}`);
    return resp.data;
}

async function createContextMap(req: CreateContextMapRequest) {
    const resp = await ciaAI.post(`${CONTEXT_MAPS_PREFIX}`, req);
    return resp.data;
}

async function compareContextMapsLinksManually(
    id: string,
    links: Link[]
): Promise<ChangedLinksResponse> {
    const resp = await ciaAI.put(`${CONTEXT_MAPS_PREFIX}/${id}/compare`, {
        links: links
    })
    return resp.data;
}

async function compareContextMapsLinks(srcId: string, targetId: string): Promise<ChangedLinksResponse> {
    const resp = await ciaAI.post(`${CONTEXT_MAPS_PREFIX}/compare`, {
        sourceId: srcId,
        targetId: targetId
    })
    return resp.data;
}

async function changeImpactAnalysis(ids: ChangeImpactAnalysisPayload): Promise<ContextMapOutputDto> {
    const resp = await ciaAI.post(`${CONTEXT_MAPS_OUTPUTS_PREFIX}/change-impact-analysis`, ids);
    return resp.data;
}

async function deleteContextMap(id: number) {
    const resp = await ciaAI.delete(`${CONTEXT_MAPS_PREFIX}/${id}`);
    return resp.data;
}

async function deleteContextMapOutputById(id: number) {
    const resp = await ciaAI.delete(`${CONTEXT_MAPS_OUTPUTS_PREFIX}/${id}`);
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