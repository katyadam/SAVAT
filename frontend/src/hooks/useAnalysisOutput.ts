import AnalysisOutputApi from "@/api/analysisOutputs";
import { MicroserviceNode } from "@/api/methods";
import { useMutation } from "@tanstack/react-query"

export const useCompareMethods = (analysisInputId: string) => {
    console.log("ID", analysisInputId);

    return useMutation({
        mutationKey: ["compareMethods"],
        mutationFn: (microservices: MicroserviceNode[]) =>
            AnalysisOutputApi.compareMethods(analysisInputId, microservices)
    })
}