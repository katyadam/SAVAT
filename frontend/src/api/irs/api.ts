import { irAI } from "../config";
import { IR, Microservice } from "./types";

const IRs_PATH = "/irs";

const getIRFiles = async (): Promise<string[]> => {
    const resp = await irAI.get("/files");
    return resp.data;
}

const getIR = async (fileName: string): Promise<IR> => {
    const fileResp = await fetch(`${IRs_PATH}/${fileName}`);
    return await fileResp.json();
}

const getMsId = (ms: Microservice): string => {
    return ms.name + "/" + ms.path
}

const IRApi = {
    getIR,
    getIRFiles,
    getMsId
};

export default IRApi;
