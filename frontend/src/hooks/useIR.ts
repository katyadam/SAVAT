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
        queryFn: async () => {
            const irFiles = await IRApi.getIRFiles();
            return irFiles.sort((a, b) => {
                const numA = parseInt(a.split("_")[0].slice(2));
                const numB = parseInt(b.split("_")[0].slice(2));
                return numA - numB;
            });
        }
    });
}