import { axiosInstance } from "../config";
import { AnalysisInput } from "./types";

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

const AnalysisInputApi = {
    getProjectAnalysisInputs,
};

export default AnalysisInputApi;