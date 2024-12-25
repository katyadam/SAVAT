import { axiosInstance } from "../config";
import { AnalysisInput } from "./types";

export const ANALYSIS_INPUTS_PREFIX = "/analysis-inputs"

async function getProjectAnalysisInputs(projectId: string): Promise<AnalysisInput[]> {
    const resp = await axiosInstance.get(`${ANALYSIS_INPUTS_PREFIX}/${projectId}`);
    return resp.data;
}

const AnalysisInputApi = {
    getProjectAnalysisInputs,
};

export default AnalysisInputApi;