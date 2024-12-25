import { axiosInstance } from "../config";
import { ANALYSIS_INPUTS_PREFIX } from "../inputs/api";
import { CommGraph, CommGraphLink, CompareCommGraphLinksResponse } from "./types";

export const COMM_GRAPH_COMPARE_PREFIX = "/graph"

async function getCommunicationGraph(analysisInputId: string): Promise<CommGraph> {
    const resp = await axiosInstance.get(`${ANALYSIS_INPUTS_PREFIX}/${analysisInputId}/graph`)
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
    compareCommGraphLinks
}

export default CommGraphApi;
