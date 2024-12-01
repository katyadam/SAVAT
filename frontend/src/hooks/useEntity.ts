import EntitiesApi from "@/api/entities/entities";
import { useQuery } from "@tanstack/react-query"

export const useEntities = (analysisInputId: string) => {
    return useQuery({
        queryKey: [],
        queryFn: () => EntitiesApi.getEntities(analysisInputId)
    });
}