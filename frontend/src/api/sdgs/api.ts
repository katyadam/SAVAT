import { axiosInstance } from "../config";
import { ChangedDto, ChangedLinksResponse, CreateSDGRequest, Link, SDG, Summary } from "./types";

export const SDG_PREFIX = "/sdgs"

async function getSDG(id: string): Promise<SDG> {
    const resp = await axiosInstance.get(`${SDG_PREFIX}/${id}`)
    return resp.data;
}

async function getSDGChanges(id: string): Promise<ChangedDto[]> {
    const resp = await axiosInstance.get(`${SDG_PREFIX}/${id}/changes`)
    return resp.data;
}

async function getSDGChange(changeSDGId: string | null): Promise<ChangedDto> {
    const resp = await axiosInstance.get(`${SDG_PREFIX}/changes/${changeSDGId}`)
    return resp.data;
}

async function getSummary(id: number): Promise<Summary> {
    const resp = await axiosInstance.get(`${SDG_PREFIX}/${id}/summary`);
    return resp.data;
}

async function createSDG(req: CreateSDGRequest) {
    const resp = await axiosInstance.post(`${SDG_PREFIX}`, req);
    return resp.data;
}

async function compareSDGLinks(
    id: string,
    links: Link[]
): Promise<ChangedLinksResponse> {
    const resp = await axiosInstance.put(`${SDG_PREFIX}/${id}/compare`, {
        links: links
    })
    return resp.data;
}

async function deleteSDG(id: number) {
    const resp = await axiosInstance.delete(`${SDG_PREFIX}/${id}`);
    return resp.data;
}

const SDGApi = {
    getSDG,
    getSDGChanges,
    getSDGChange,
    getSummary,
    createSDG,
    compareSDGLinks,
    deleteSDG
}

export default SDGApi;
