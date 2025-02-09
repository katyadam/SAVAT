import AnalysisInputApi from "@/api/inputs/api";
import { useQuery } from "@tanstack/react-query"

export const useAnalysisInputs = (projectId: string) => {
    return useQuery({
        queryKey: ["inputs", projectId],
        queryFn: () => AnalysisInputApi.getProjectAnalysisInputs(projectId)
    });
}