export const getWindowNaming = (): string => {
    const location = window.location;
    if (location.href.includes("context-maps"))
        return "Context Map Input";
    if (location.href.includes("context-map-output"))
        return "Context Map CIA Output";
    if (location.href.includes("sdg"))
        return "Service Dependency Graph";
    if (location.href.includes("call-graph-input"))
        return "Call Graph Input"
    if (location.href.includes("call-graph-output"))
        return "Call Graph CIA Output"

    return "";
}