import { ANALYSIS_INPUTS_PREFIX } from "../inputs/analysisInputs";
import { axiosInstance } from "../config";
import { GraphData } from "./types";

async function getEntities(id: string): Promise<GraphData> {
    const resp = await axiosInstance.get(`${ANALYSIS_INPUTS_PREFIX}/${id}/entities`)
    return resp.data;
}

const getChangedColor = (type: string): string => {
    switch (type) {
        case "SAME":
            return "black";
        case "ADDED":
            return "green";
        case "REMOVED":
            return "red";
        case "MODIFIED":
            return "blue";
        default:
            return "white";
    }
};


const EntitiesApi = {
    getEntities,
    getChangedColor
};

export default EntitiesApi;