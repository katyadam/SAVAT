import { ANALYSIS_INPUTS_PREFIX } from "../inputs/analysisInputs";
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
    compareEntitiesLinks,
    getEntitiesDiffs,
    getEntitiesDiff,
    getChangedColor
};

export default EntitiesApi;