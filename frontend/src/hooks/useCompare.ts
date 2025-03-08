import MethodsApi from "@/api/methods/api";
import { MicroserviceNode } from "@/api/methods/types";
import { useMutation } from "@tanstack/react-query"

export const useCompareMethods = (analysisInputId: string) => {
    return useMutation({
        mutationKey: ["compareMethods"],
        mutationFn: (microservices: MicroserviceNode[]) =>
            MethodsApi.compareMethods(analysisInputId, microservices)
    })
}