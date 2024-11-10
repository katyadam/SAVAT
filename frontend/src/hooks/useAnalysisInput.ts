import AnalysisInputApi from "@/api/analysisInputs";
import { useQuery } from "@tanstack/react-query"

export const useAnalysisInputs = (projectId: string) => {
    return useQuery({
        queryKey: ["inputs"],
        queryFn: () => AnalysisInputApi.getProjectAnalysisInputs(projectId)
    });
}