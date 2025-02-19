import { axiosInstance } from "../config";
import { AnalysisInput, CreateAnalysisInput } from "./types";

export const ANALYSIS_INPUTS_PREFIX = "/analysis-inputs"

async function getProjectAnalysisInputs(projectId: string): Promise<AnalysisInput[]> {
    const resp = await axiosInstance.get(`${ANALYSIS_INPUTS_PREFIX}/${projectId}`);
    return resp.data;
}

async function createAnalysisInput(input: CreateAnalysisInput) {
    const resp = await axiosInstance.post(`${ANALYSIS_INPUTS_PREFIX}`, {
        ...input,
        createdAt: new Date().toISOString()
    });
    return resp;
}

async function deleteAnalysisInput(id: number) {
    const resp = await axiosInstance.delete(`${ANALYSIS_INPUTS_PREFIX}/${id}`);
    return resp.data;
}

const AnalysisInputApi = {
    getProjectAnalysisInputs,
    createAnalysisInput,
    deleteAnalysisInput
};

export default AnalysisInputApi;