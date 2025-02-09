import { axiosInstance } from "../config";
import { AnalysisInput, CreateAnalysisInput } from "./types";

export const ANALYSIS_INPUTS_PREFIX = "/analysis-inputs"

async function getProjectAnalysisInputs(projectId: string): Promise<AnalysisInput[]> {
    const resp = await axiosInstance.get(`${ANALYSIS_INPUTS_PREFIX}/${projectId}`);
    resp.data.forEach((input: AnalysisInput) => {
        input.createdAt = new Intl.DateTimeFormat('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
        }).format(new Date(input.createdAt));
    })
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