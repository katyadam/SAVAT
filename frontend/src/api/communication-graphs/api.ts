import { axiosInstance } from "../config";
import { ANALYSIS_INPUTS_PREFIX } from "../inputs/api";
import { CommGraph, CommGraphDiff, CommGraphLink, CompareCommGraphLinksResponse } from "./types";

export const COMM_GRAPH_COMPARE_PREFIX = "/graph"

async function getCommunicationGraph(analysisInputId: string): Promise<CommGraph> {
    const resp = await axiosInstance.get(`${ANALYSIS_INPUTS_PREFIX}/${analysisInputId}/graph`)
    return resp.data;
}

async function getCommGraphDiffs(analysisInputId: string): Promise<CommGraphDiff[]> {
    const resp = await axiosInstance.get(`${COMM_GRAPH_COMPARE_PREFIX}/analysis-input/${analysisInputId}`)
    return resp.data;
}

async function getCommGraphDiff(id: string | null): Promise<CommGraphDiff> {
    const resp = await axiosInstance.get(`${COMM_GRAPH_COMPARE_PREFIX}/${id}`)
    return resp.data;
}

async function compareCommGraphLinks(
    analysisInputId: string,
    links: CommGraphLink[]
): Promise<CompareCommGraphLinksResponse> {
    const resp = await axiosInstance.put(`${COMM_GRAPH_COMPARE_PREFIX}/${analysisInputId}/compare`, {
        links: links
    })
    return resp.data;
}

const CommGraphApi = {
    getCommunicationGraph,
    compareCommGraphLinks,
    getCommGraphDiffs,
    getCommGraphDiff
}

export default CommGraphApi;
