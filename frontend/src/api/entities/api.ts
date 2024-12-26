import { ANALYSIS_INPUTS_PREFIX } from "../inputs/api";
import { axiosInstance } from "../config";
import { EntitiesDiff, EntityLink, GraphData } from "./types";
import { CompareEntitiesLinksResponse } from "./types";

export const ENTITIES_COMPARE_PREFIX = "/entities"

async function getEntities(id: string): Promise<GraphData> {
    const resp = await axiosInstance.get(`${ANALYSIS_INPUTS_PREFIX}/${id}/entities`)
    return resp.data;
}

async function compareEntitiesLinks(
    analysisInputId: string,
    links: EntityLink[]
): Promise<CompareEntitiesLinksResponse> {
    const resp = await axiosInstance.put(`${ENTITIES_COMPARE_PREFIX}/${analysisInputId}/compare`, {
        links: links
    })
    return resp.data;
}

async function getEntitiesDiffs(analysisInputId: string): Promise<EntitiesDiff[]> {
    const resp = await axiosInstance.get(`${ENTITIES_COMPARE_PREFIX}/analysis-input/${analysisInputId}`)
    return resp.data;
}

async function getEntitiesDiff(id: string | null): Promise<EntitiesDiff> {
    const resp = await axiosInstance.get(`${ENTITIES_COMPARE_PREFIX}/${id}`)
    return resp.data;
}

const EntitiesApi = {
    getEntities,
    compareEntitiesLinks,
    getEntitiesDiffs,
    getEntitiesDiff,
};

export default EntitiesApi;