import { axiosInstance } from "../config";

const ANALYSIS_INPUTS_PREFIX = "/analysis-inputs"

export type AnalysisInput = {
    id: number,
    projectId: string,
    version: string,
    commitHash: string,
    createdAt: string
};

export type MicroserviceMethodNode = {
    name: string,
    bytecodeHash: string
}

export type MicroserviceNode = {
    name: string,
    methods: MicroserviceMethodNode[]
}

async function getProjectAnalysisInputs(projectId: string): Promise<AnalysisInput[]> {
    const resp = await axiosInstance.get(`${ANALYSIS_INPUTS_PREFIX}/${projectId}`);
    return resp.data;
}

async function getAnalysisInputMethods(id: string): Promise<MicroserviceNode[]> {
    const resp = await axiosInstance.get(`${ANALYSIS_INPUTS_PREFIX}/${id}/methods`)
    return resp.data;
}

const AnalysisInputApi = {
    getProjectAnalysisInputs,
    getAnalysisInputMethods
};

export default AnalysisInputApi;