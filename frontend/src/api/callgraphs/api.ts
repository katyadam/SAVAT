import { axiosInstance } from "../config";
import { CallGraph, CallGraphInput, CallGraphInputSimple, CallGraphInputSummary, CallGraphOutputSimple, ChangedCallGraph, ChangeImpactAnalysisPayload, CreateCallGraphInput } from "./types";

export const CALL_GRAPH_INPUTS_PREFIX = "/call-graph-inputs"
export const CALL_GRAPH_OUTPUTS_PREFIX = "/call-graph-outputs"


async function getCallGraphInputById(callGraphInputId: string): Promise<CallGraphInput> {
    const resp = await axiosInstance.get(`${CALL_GRAPH_INPUTS_PREFIX}/${callGraphInputId}`)
    return resp.data;
}

async function getCallGraphInputsByProjectId(projectId: string): Promise<CallGraphInputSimple[]> {
    const resp = await axiosInstance.get(`${CALL_GRAPH_INPUTS_PREFIX}/project/${projectId}`)
    return resp.data;
}

async function computeMethodReachabilityForInput(callGraphInputId: string, variant: "inputs" | "outputs", methodSignature: string): Promise<CallGraph> {
    const resp = await axiosInstance.put(
        `/call-graph-${variant}/${callGraphInputId}/method-reachability`,
        {
            methodSignature: methodSignature
        });

    return resp.data;
}

async function createCallGraphInput(input: CreateCallGraphInput) {
    const resp = await axiosInstance.post(CALL_GRAPH_INPUTS_PREFIX, {
        ...input,
        createdAt: new Date().toISOString() // .slice(0, 19);
    });
    return resp;
}

async function deleteCallGraphInput(id: number) {
    const resp = await axiosInstance.delete(`${CALL_GRAPH_INPUTS_PREFIX}/${id}`);
    return resp.data;
}

async function getAllProjectsCallGraphOuputs(projectId: string): Promise<CallGraphOutputSimple[]> {
    const resp = await axiosInstance.get(`${CALL_GRAPH_OUTPUTS_PREFIX}/project/${projectId}`)
    return resp.data;
}

async function getChangedCallGraphById(id: string): Promise<ChangedCallGraph> {
    const resp = await axiosInstance.get(`${CALL_GRAPH_OUTPUTS_PREFIX}/${id}`);
    return resp.data;
}

async function changeImpactAnalysis(ids: ChangeImpactAnalysisPayload): Promise<CallGraphOutputSimple> {
    const resp = await axiosInstance.post(`${CALL_GRAPH_OUTPUTS_PREFIX}/change-impact-analysis`, ids);
    return resp.data;
}

async function deleteCallGraphOutput(id: number) {
    const resp = await axiosInstance.delete(`${CALL_GRAPH_OUTPUTS_PREFIX}/${id}`);
    return resp.data;
}

async function getSummary(id: number): Promise<CallGraphInputSummary> {
    const resp = await axiosInstance.get(`${CALL_GRAPH_INPUTS_PREFIX}/${id}/summary`)
    return resp.data;
}


const CallGraphsApi = {
    getCallGraphInputById,
    getCallGraphInputsByProjectId,
    computeMethodReachabilityForInput,
    createCallGraphInput,
    deleteCallGraphInput,
    getAllProjectsCallGraphOuputs,
    getChangedCallGraphById,
    changeImpactAnalysis,
    deleteCallGraphOutput,
    getSummary
}

export default CallGraphsApi;
