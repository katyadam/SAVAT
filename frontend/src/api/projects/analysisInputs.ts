import { axiosInstance } from "../config";

const ANALYSIS_INPUTS_PREFIX = "/analysis-inputs"

export type AnalysisInput = {
    id: number,
    projectId: string,
    version: string,
    commitHash: string,
    createdAt: string
};

async function getProjectAnalysisInputs(projectId: string): Promise<AnalysisInput[]> {
    const resp = await axiosInstance.get(`${ANALYSIS_INPUTS_PREFIX}/${projectId}`);
    return resp.data;
}

const AnalysisInputApi = {
    getProjectAnalysisInputs
};

export default AnalysisInputApi;