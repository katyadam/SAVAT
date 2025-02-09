import { axiosInstance } from "../config";
import { CallGraph, CallGraphInput, CallGraphInputSimple, CreateCallGraphInput } from "./types";

export const CALL_GRAPH_INPUTS_COMPARE_PREFIX = "/call-graph-inputs"

async function getCallGraphInputById(callGraphInputId: string): Promise<CallGraphInput> {
    const resp = await axiosInstance.get(`${CALL_GRAPH_INPUTS_COMPARE_PREFIX}/${callGraphInputId}`)
    return resp.data;
}

async function getCallGraphInputsByProjectId(projectId: string): Promise<CallGraphInputSimple[]> {
    const resp = await axiosInstance.get(`${CALL_GRAPH_INPUTS_COMPARE_PREFIX}/project/${projectId}`)
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
    const resp = await axiosInstance.post(`${CALL_GRAPH_INPUTS_COMPARE_PREFIX}/${callGraphInputId}/method-reachability`, {
        methodSignature: methodSignature
    });

    return resp.data;
}

async function createCallGraphInput(input: CreateCallGraphInput) {
    console.log(input)
    const resp = await axiosInstance.post(CALL_GRAPH_INPUTS_COMPARE_PREFIX, {
        ...input,
        createdAt: new Date().toISOString() // .slice(0, 19);
    });
    console.log(resp);
    return resp;
}


const CallGraphsApi = {
    getCallGraphInputById,
    getCallGraphInputsByProjectId,
    computeMethodReachability,
    createCallGraphInput
}

export default CallGraphsApi;
