import { axiosInstance } from "./config";
import { ChangedEntityLink, EntityLink } from "./entities";
import { MicroserviceNode } from "./methods";

const ANALYSIS_OUTPUTS_PREFIX = "/analysis-outputs"

export type CompareMethodsResponse = {
    changedMs: MicroserviceNode[]
}

async function compareMethods(
    analysisInputId: string,
    microservices: MicroserviceNode[]
): Promise<CompareMethodsResponse> {
    const resp = await axiosInstance.put(`${ANALYSIS_OUTPUTS_PREFIX}/${analysisInputId}/methods-diff`, {
        microservices: microservices
    })
    return resp.data;
}

export type CompareEntitiesLinksResponse = {
    changedLinks: ChangedEntityLink[]
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