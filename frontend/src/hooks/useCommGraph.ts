import CommGraphApi from "@/api/communication-graphs/api";
import { useQuery } from "@tanstack/react-query";

export const useCommGraph = (analysisInputId: string) => {
    return useQuery({
        queryKey: [],
        queryFn: () => CommGraphApi.getCommunicationGraph(analysisInputId)
    });
}