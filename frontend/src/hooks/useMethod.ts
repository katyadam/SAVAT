import AnalysisInputApi from "@/api/analysisInputs";
import { useQuery } from "@tanstack/react-query"

export const useMethod = (analysisInputId: string) => {
    return useQuery({
        queryKey: ["method", analysisInputId],
        queryFn: () => AnalysisInputApi.getAnalysisInputMethods(analysisInputId)
    });
}