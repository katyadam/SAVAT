import { ANALYSIS_INPUTS_PREFIX } from "./analysisInputs"
import { axiosInstance } from "./config"

export type MicroserviceMethodNode = {
    name: string,
    bytecodeHash: string
}

export type MicroserviceNode = {
    name: string,
    methods: MicroserviceMethodNode[]
}

async function getMethods(id: string): Promise<MicroserviceNode[]> {
    const resp = await axiosInstance.get(`${ANALYSIS_INPUTS_PREFIX}/${id}/methods`)
    return resp.data;
}

const MethodsApi = {
    getMethods,
};

export default MethodsApi;