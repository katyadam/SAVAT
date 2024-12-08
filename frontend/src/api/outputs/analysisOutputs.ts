import { axiosInstance } from "../config";
import { MicroserviceNode } from "../methods/types";
import { CompareMethodsResponse } from "./types";

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

const AnalysisOutputApi = {
    compareMethods,
};

export default AnalysisOutputApi;