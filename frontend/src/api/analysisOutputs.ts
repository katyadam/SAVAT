import { MicroserviceNode } from "./analysisInputs";
import { axiosInstance } from "./config";

const ANALYSIS_OUTPUTS_PREFIX = "/analysis-outputs"

export type CompareMethodsRequest = {
    analysisInputId: string,
    microservices: MicroserviceNode[]
}

export type CompareMethodsResponse = {
    microservices: MicroserviceNode[]
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

const AnalysisOutputApi = {
    compareMethods,
};

export default AnalysisOutputApi;