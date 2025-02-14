import { axiosInstance } from "../config";
import { CallGraph, CallGraphInput, CallGraphInputSimple, CallGraphOutputSimple, ChangedCallGraph, ChangeImpactAnalysisPayload, CreateCallGraphInput } from "./types";

export const CALL_GRAPH_INPUTS_PREFIX = "/call-graph-inputs"
export const CALL_GRAPH_OUTPUTS_PREFIX = "/call-graph-outputs"


async function getCallGraphInputById(callGraphInputId: string): Promise<CallGraphInput> {
    const resp = await axiosInstance.get(`${CALL_GRAPH_INPUTS_PREFIX}/${callGraphInputId}`)
    return resp.data;
}

async function getCallGraphInputsByProjectId(projectId: string): Promise<CallGraphInputSimple[]> {
    const resp = await axiosInstance.get(`${CALL_GRAPH_INPUTS_PREFIX}/project/${projectId}`)
    resp.data.forEach((input: CallGraphInputSimple) => {
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
    });
    return resp.data;
}

async function computeMethodReachability(callGraphInputId: string, methodSignature: string): Promise<CallGraph> {
    const resp = await axiosInstance.post(`${CALL_GRAPH_INPUTS_PREFIX}/${callGraphInputId}/method-reachability`, {
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

async function getAllProjectsCallGraphOuputs(projectId: string): Promise<CallGraphOutputSimple[]> {
    const resp = await axiosInstance.get(`${CALL_GRAPH_OUTPUTS_PREFIX}/project/${projectId}`)
    resp.data.forEach((input: CallGraphOutputSimple) => {
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

async function getChangedCallGraphById(id: string): Promise<ChangedCallGraph> {
    const resp = await axiosInstance.get(`${CALL_GRAPH_OUTPUTS_PREFIX}/${id}`);
    return resp.data;
}

async function changeImpactAnalysis(ids: ChangeImpactAnalysisPayload) {
    const resp = await axiosInstance.post(`${CALL_GRAPH_OUTPUTS_PREFIX}/change-impact-analysis`, ids);
    return resp.data;
}

async function deleteCallGraphOutput(id: number) {
    const resp = await axiosInstance.delete(`${CALL_GRAPH_OUTPUTS_PREFIX}/${id}`);
    return resp.data;
}


const CallGraphsApi = {
    getCallGraphInputById,
    getCallGraphInputsByProjectId,
    computeMethodReachability,
    createCallGraphInput,
    getAllProjectsCallGraphOuputs,
    getChangedCallGraphById,
    changeImpactAnalysis,
    deleteCallGraphOutput
}

export default CallGraphsApi;
