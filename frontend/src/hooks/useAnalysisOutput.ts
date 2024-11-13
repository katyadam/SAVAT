import { MicroserviceNode } from "@/api/analysisInputs";
import AnalysisOutputApi from "@/api/analysisOutputs";
import { useMutation } from "@tanstack/react-query"

export const useCompareMethods = (analysisInputId: string) => {
    console.log("ID", analysisInputId);

    return useMutation({
        mutationKey: ["compareMethods"],
        mutationFn: (microservices: MicroserviceNode[]) =>
            AnalysisOutputApi.compareMethods(analysisInputId, microservices)
    })
}