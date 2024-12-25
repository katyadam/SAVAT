import { axiosInstance } from "../config";
import { ANALYSIS_INPUTS_PREFIX } from "../inputs/api";
import { CommGraph } from "./types";


async function getCommunicationGraph(analysisInputId: string): Promise<CommGraph> {
    const resp = await axiosInstance.get(`${ANALYSIS_INPUTS_PREFIX}/${analysisInputId}/graph`)
    return resp.data;
}


const CommGraphApi = {
    getCommunicationGraph
}

export default CommGraphApi;
