import { axiosInstance } from "../config"
import { ANALYSIS_INPUTS_PREFIX } from "../inputs/analysisInputs"
import { CompareMethodsResponse } from "./types";
import { MicroserviceNode } from "./types";

export const METHODS_COMPARE_PREFIX = "/methods"

async function getMethods(id: string): Promise<MicroserviceNode[]> {
    const resp = await axiosInstance.get(`${ANALYSIS_INPUTS_PREFIX}/${id}/methods`)
    return resp.data;
}

async function compareMethods(
    analysisInputId: string,
    microservices: MicroserviceNode[]
): Promise<CompareMethodsResponse> {
    const resp = await axiosInstance.put(`${METHODS_COMPARE_PREFIX}/analysis-input/${analysisInputId}`, {
        microservices: microservices
    })
    return resp.data;
}

const MethodsApi = {
    getMethods,
    compareMethods
};

export default MethodsApi;