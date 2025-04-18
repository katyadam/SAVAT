import { useQuery } from "@tanstack/react-query";
import IRApi from "@/api/irs/api";

export const useIRFileContent = (fileName: string) => {
    return useQuery({
        queryKey: ["ir_file_content", fileName],
        queryFn: () => IRApi.getIR(fileName)
    })
};

export const useIRFiles = () => {
    return useQuery({
        queryKey: ["IR_files"],
        queryFn: () => IRApi.getIRFiles()
    });
}