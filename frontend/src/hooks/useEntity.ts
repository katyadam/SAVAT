import EntitiesApi from "@/api/entities";
import { useQuery } from "@tanstack/react-query"

export const useEntities = (analysisInputId: string) => {
    return useQuery({
        queryKey: ["entities", analysisInputId],
        queryFn: () => EntitiesApi.getEntities(analysisInputId)
    });
}