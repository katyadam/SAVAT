import MethodsApi from "@/api/methods/methods";
import { useQuery } from "@tanstack/react-query"

export const useMethods = (analysisInputId: string) => {
    return useQuery({
        queryKey: ["methods", analysisInputId],
        queryFn: () => MethodsApi.getMethods(analysisInputId)
    });
}