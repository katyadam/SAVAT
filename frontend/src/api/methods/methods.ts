import { axiosInstance } from "../config"
import { ANALYSIS_INPUTS_PREFIX } from "../inputs/analysisInputs"
import { MicroserviceNode } from "./types";

async function getMethods(id: string): Promise<MicroserviceNode[]> {
    const resp = await axiosInstance.get(`${ANALYSIS_INPUTS_PREFIX}/${id}/methods`)
    return resp.data;
}

const MethodsApi = {
    getMethods,
};

export default MethodsApi;