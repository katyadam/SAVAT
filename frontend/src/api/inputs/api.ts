import { axiosInstance } from "../config";
import { AnalysisInput, CreateAnalysisInput } from "./types";

export const ANALYSIS_INPUTS_PREFIX = "/analysis-inputs"

async function getProjectAnalysisInputs(projectId: string): Promise<AnalysisInput[]> {
    const resp = await axiosInstance.get(`${ANALYSIS_INPUTS_PREFIX}/${projectId}`);
    return resp.data;
}

async function createAnalysisInput(input: CreateAnalysisInput) {
    console.log(input);
    const resp = await axiosInstance.post(`${ANALYSIS_INPUTS_PREFIX}`, {
        ...input,
        createdAt: new Date().toISOString()
    });
    return resp;
}

const AnalysisInputApi = {
    getProjectAnalysisInputs,
    createAnalysisInput
};

export default AnalysisInputApi;