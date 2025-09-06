import { useQuery } from "@tanstack/react-query";
import ContextMapApi from "@/api/context-maps/api";
import SDGApi from "@/api/sdgs/api";
import CallGraphsApi from "@/api/callgraphs/api";
import { ContextMapFullDto, ContextMapOutputFullDto } from "@/api/context-maps/types";
import { SDGFullDto } from "@/api/sdgs/types";
import { CallGraphInput, CallGraphOutputFullDto } from "@/api/callgraphs/types";

type SARTypeMap = {
    cmInput: ContextMapFullDto;
    cmOutput: ContextMapOutputFullDto;
    sdgInput: SDGFullDto;
    cgInput: CallGraphInput;
    cgOutput: CallGraphOutputFullDto;
    empty: ""
};

export const useVariousSAR = <T extends keyof SARTypeMap>(
    id: string,
    type: T
) => {
    return useQuery<SARTypeMap[T]>({
        queryKey: [type, id],
        queryFn: () => {
            switch (type) {
                case "cmInput":
                    return ContextMapApi.getContextMap(id) as Promise<SARTypeMap[T]>;
                case "cmOutput":
                    return ContextMapApi.getContextMapOutputById(id) as Promise<SARTypeMap[T]>;
                case "sdgInput":
                    return SDGApi.getSDG(id) as Promise<SARTypeMap[T]>;
                case "cgInput":
                    return CallGraphsApi.getCallGraphInputById(id) as Promise<SARTypeMap[T]>;
                case "cgOutput":
                    return CallGraphsApi.getChangedCallGraphById(id) as Promise<SARTypeMap[T]>;
                default:
                    throw new Error("Invalid type");
            }
        },
    });
};

const decideTypeToCall = (pathname: string) => {
    if (pathname.includes("context-maps"))
        return "cmInput";
    if (pathname.includes("context-map-output"))
        return "cmOutput";
    if (pathname.includes("sdg"))
        return "sdgInput";
    if (pathname.includes("call-graph-input"))
        return "cgInput";
    if (pathname.includes("call-graph-output"))
        return "cgOutput";
    return "empty";
}

export const useWindowName = () => {
    const location = window.location;
    const id = location.pathname.split("/")[2];
    const dataType: keyof SARTypeMap = decideTypeToCall(location.pathname);

    const { data } = useVariousSAR(id, dataType);

    if (data) {
        if (location.pathname.includes("context-maps")) {
            const cmInput = (data as ContextMapFullDto);
            return `Context Map Input | Commit Hash: ${cmInput.commitHash} | Version: ${cmInput.version}`;
        }
        if (location.pathname.includes("context-map-output")) {
            const cmOutput = (data as ContextMapOutputFullDto);
            return `Context Map CIA Output | Source Version: ${cmOutput.sourceInput.version} | Target Version: ${cmOutput.targetInput.version}`;
        }
        if (location.pathname.includes("sdg")) {
            const sdgInput = (data as SDGFullDto);
            return `Service Dependency Graph | Commit Hash: ${sdgInput.commitHash} | Version: ${sdgInput.version}`;
        }
        if (location.pathname.includes("call-graph-input")) {
            const cgInput = (data as CallGraphInput);
            return `Call Graph Input | Commit Hash: ${cgInput.commitHash} | Version: ${cgInput.version}`;
        }
        if (location.pathname.includes("call-graph-output")) {
            const cgOutput = (data as CallGraphOutputFullDto);
            return `Call Graph CIA Output | Source Version: ${cgOutput.sourceInput.version} | Target Version: ${cgOutput.targetInput.version}`;
        }

    }
    return "";
}