import { CommGraph } from "../communication-graphs/types";
import { GraphData } from "../entities/types";

export type AnalysisInput = {
    id: number,
    projectId: string,
    version: string,
    commitHash: string,
    createdAt: string
};

export type CreateAnalysisInput = Omit<AnalysisInput, "id" | "createdAt"> & {
    entities: GraphData,
    graph: CommGraph,
}

export type AnalysisInputSummary = {
    totalEntitiesComparisons: number;
    totalGraphComparisons: number;
}