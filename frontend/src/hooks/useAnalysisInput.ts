import AnalysisInputApi from "@/api/projects/analysisInputs";
import { useQuery } from "@tanstack/react-query"

export const useAnalysisInputs = (projectId: string) => {
    return useQuery({
        queryKey: ["projects"],
        queryFn: () => AnalysisInputApi.getProjectAnalysisInputs(projectId)
    });
}