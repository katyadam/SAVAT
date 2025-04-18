import { useQuery } from "@tanstack/react-query";
import IRApi from "@/api/irs/api";

export const useIRs = (fileName: string) => {
    return useQuery({
        queryKey: ["IR_files"],
        queryFn: () => IRApi.getIR(fileName)
    })
};

export const useIRFiles = () => {

    return useQuery({
        queryKey: ["IR_files"],
        queryFn: () => IRApi.getIRFiles()
    });
}