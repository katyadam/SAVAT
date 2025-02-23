import CommGraphApi from "@/api/communication-graphs/api";
import { CommGraphDiff } from "@/api/communication-graphs/types";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useCommGraph = (analysisInputId: string) => {
    return useQuery({
        queryKey: [],
        queryFn: () => CommGraphApi.getCommunicationGraph(analysisInputId)
    });
}

export const useCommGraphDiffs = (analysisInputId: string): UseQueryResult<CommGraphDiff[], Error> => {
    return useQuery({
        queryKey: ["commGraphDiffs"],
        queryFn: () => CommGraphApi.getCommGraphDiffs(analysisInputId)
    });
}

export const useCommGraphDiff = (id: string): UseQueryResult<CommGraphDiff, Error> => {
    return useQuery({
        queryKey: ["commGraphDiff", id],
        queryFn: () => CommGraphApi.getCommGraphDiff(id),
        enabled: !!id && id !== "None",
    });
}