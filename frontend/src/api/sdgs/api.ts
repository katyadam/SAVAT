import { ciaAI } from "../config";
import { ChangedDto, ChangedLinksResponse, CreateSDGRequest, Link, SDGFullDto, Summary } from "./types";

export const SDG_PREFIX = "/sdgs"

async function getSDG(id: string): Promise<SDGFullDto> {
    const resp = await ciaAI.get(`${SDG_PREFIX}/${id}`)
    return resp.data;
}

async function getSDGChanges(id: string): Promise<ChangedDto[]> {
    const resp = await ciaAI.get(`${SDG_PREFIX}/${id}/changes`)
    return resp.data;
}

async function getSDGChange(changeSDGId: string | null): Promise<ChangedDto> {
    const resp = await ciaAI.get(`${SDG_PREFIX}/changes/${changeSDGId}`)
    return resp.data;
}

async function getSummary(id: number): Promise<Summary> {
    const resp = await ciaAI.get(`${SDG_PREFIX}/${id}/summary`);
    return resp.data;
}

async function createSDG(req: CreateSDGRequest) {
    const resp = await ciaAI.post(`${SDG_PREFIX}`, req);
    return resp.data;
}

async function compareSDGLinksManually(
    id: string,
    links: Link[]
): Promise<ChangedLinksResponse> {
    const resp = await ciaAI.put(`${SDG_PREFIX}/${id}/compare`, {
        links: links
    })
    return resp.data;
}

async function compareSDGLinks(
    sourceId: string,
    targetId: string
): Promise<ChangedLinksResponse> {
    const resp = await ciaAI.post(`${SDG_PREFIX}/compare`, {
        sourceId: sourceId,
        targetId: targetId
    })
    return resp.data;
}

async function deleteSDG(id: number) {
    const resp = await ciaAI.delete(`${SDG_PREFIX}/${id}`);
    return resp.data;
}

const SDGApi = {
    getSDG,
    getSDGChanges,
    getSDGChange,
    getSummary,
    createSDG,
    compareSDGLinksManually,
    compareSDGLinks,
    deleteSDG
}

export default SDGApi;
