import { axiosInstance } from "../config"
import { CompareMethodsResponse } from "./types";
import { MicroserviceNode } from "./types";

export const METHODS_COMPARE_PREFIX = "/methods"


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
    compareMethods
};

export default MethodsApi;