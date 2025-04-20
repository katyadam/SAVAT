import { irAI } from "../config";
import { IR } from "./types";

const IRs_PATH = "/irs";

const getIRFiles = async (): Promise<string[]> => {
    const resp = await irAI.get("/api/files");
    return resp.data;
}

const getIR = async (fileName: string): Promise<IR> => {
    const fileResp = await fetch(`${IRs_PATH}/${fileName}`);
    return await fileResp.json();
}

const IRApi = {
    getIR,
    getIRFiles
};

export default IRApi;
