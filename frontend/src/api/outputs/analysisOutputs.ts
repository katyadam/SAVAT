import { axiosInstance } from "../config";
import { EntityLink } from "../entities/types";
import { MicroserviceNode } from "../methods/types";
import { CompareMethodsResponse, CompareEntitiesLinksResponse } from "./types";

const ANALYSIS_OUTPUTS_PREFIX = "/analysis-outputs"

async function compareMethods(
    analysisInputId: string,
    microservices: MicroserviceNode[]
): Promise<CompareMethodsResponse> {
    const resp = await axiosInstance.put(`${ANALYSIS_OUTPUTS_PREFIX}/${analysisInputId}/methods-diff`, {
        microservices: microservices
    })
    return resp.data;
}

async function compareEntitiesLinks(
    analysisInputId: string,
    links: EntityLink[]
): Promise<CompareEntitiesLinksResponse> {
    const resp = await axiosInstance.put(`${ANALYSIS_OUTPUTS_PREFIX}/${analysisInputId}/entities-links-diff`, {
        links: links
    })
    return resp.data;
}

const AnalysisOutputApi = {
    compareMethods,
    compareEntitiesLinks
};

export default AnalysisOutputApi;