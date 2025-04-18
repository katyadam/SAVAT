import { irAI } from "../config";
import { IR } from "./types";

const IRs_PATH = "/irs";

const getIRFiles = async (): Promise<String[]> => {
    const resp = await irAI.get("/api/files");
    return resp.data;
}

const getIR = async (fileName: string): Promise<IR> => {
    const fileResp = await fetch(`${IRs_PATH}/${fileName}`);
    return await fileResp.json();
}

// const getIrs = async (onProgress?: (loaded: number, total: number) => void): Promise<Map<string, IR>> => {
//     const irsMap: Map<string, IR> = new Map();

//     const filesFetch = await irAI.get("/api/files");
//     const files: string[] = filesFetch.data;
//     const total = files.length;
//     let loaded = 0;
//     for (const file of files) {
//         const fileResponse = await fetch(`${IRs_PATH}/${file}`);
//         const ir: IR = await fileResponse.json();
//         irsMap.set(ir.commitID, ir);

//         loaded++;
//         onProgress?.(loaded, total);
//     }

//     return irsMap;
// };

const IRApi = {
    getIR,
    getIRFiles
};

export default IRApi;
