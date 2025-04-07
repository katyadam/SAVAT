import { CY_COLOR_BLUE, CY_COLOR_GREEN, CY_COLOR_NEUTRAL, CY_COLOR_RED, decideTextColorByBgColor, getChangedColor } from "@/api/utils";
import Cytoscape, { ElementsDefinition } from "cytoscape";
import { FcoseLayoutOptions } from "cytoscape-fcose";

const layoutOptions: FcoseLayoutOptions = {
    name: "fcose",
    animate: true,
    fit: true,
    animationDuration: 0,
    nodeSeparation: 80,
    tilingPaddingHorizontal: 80,
    tilingPaddingVertical: 20,
};


const getEntityDetailsStyles = (msColors: Map<string, string>): Cytoscape.Stylesheet[] => {
    return [
        {
            selector: "node",
            style: {
                "background-color": (ele) =>
                    msColors.get(ele.data("microservice")) || CY_COLOR_NEUTRAL,
                "border-width": "4",
                shape: "roundrectangle",
                label: "data(label)",
                width: "label",
                height: "label",
                "text-wrap": "wrap",
                "padding-left": "10",
                "text-justification": "left",
                "text-halign": "center",
                "text-valign": "center",
                "font-size": 12,
                "font-family": "Arial, sans-serif",
                "color": (ele: Cytoscape.NodeSingular) => decideTextColorByBgColor(msColors.get(ele.data("microservice")) || CY_COLOR_NEUTRAL)
            },
        },
        {
            selector: "edge",
            style: {
                width: 5,
                "line-color": (ele) => getChangedColor(ele.data("typeOfChange")),
                "curve-style": "bezier",
                "target-arrow-color": (ele) => getChangedColor(ele.data("typeOfChange")),
                "target-arrow-shape": "triangle",
                "text-rotation": "autorotate",
            },
        },
        {
            selector: "node[typeOfChange = 'ADDED']",
            style: {
                "border-width": 4,
                "border-color": CY_COLOR_GREEN,
                "border-style": "dashed"
            }
        },
        {
            selector: "node[typeOfChange = 'MODIFIED']",
            style: {
                "border-width": 4,
                "border-color": CY_COLOR_BLUE,
                "border-style": "dashed"
            }
        },
        {
            selector: "node[typeOfChange = 'REMOVED']",
            style: {
                "border-width": 4,
                "border-color": CY_COLOR_RED,
                "border-style": "dashed"
            }
        },
    ];
}

const getDefaultGraphStyles = (msColors: Map<string, string>): Cytoscape.Stylesheet[] => {
    return [
        {
            selector: "node",
            style: {
                shape: "round-octagon",
                "background-color": (ele) =>
                    msColors.get(ele.data("microservice")) || CY_COLOR_NEUTRAL,
                width: "20",
                height: "20",
                label: "data(label)",
                "text-valign": "top",
                "text-halign": "center",
                color: "black",
                "font-size": "12px",
            },
        },
        {
            selector: "node[typeOfChange = 'ADDED']",
            style: {
                "border-width": 4,
                "border-color": CY_COLOR_GREEN,
                "border-style": "dashed"
            }
        },
        {
            selector: "node[typeOfChange = 'MODIFIED']",
            style: {
                "border-width": 4,
                "border-color": CY_COLOR_BLUE,
                "border-style": "dashed"
            }
        },
        {
            selector: "node[typeOfChange = 'REMOVED']",
            style: {
                "border-width": 4,
                "border-color": CY_COLOR_RED,
                "border-style": "dashed"
            }
        },
        {
            selector: "edge",
            style: {
                width: 5,
                "line-color": (ele) => getChangedColor(ele.data("typeOfChange")),
                "curve-style": "bezier",
                "target-arrow-color": (ele) => getChangedColor(ele.data("typeOfChange")),
                "target-arrow-shape": "triangle",
            },
        },
    ];
}

export const getCyInstance = (
    cyRef: React.MutableRefObject<HTMLDivElement | null>,
    elements: ElementsDefinition,
    msColors: Map<string, string>,
    graphType: "defaultGraph" | "detailsGraph"
) => {

    return Cytoscape({
        container: cyRef.current,
        elements,
        style: graphType === "defaultGraph" ? getDefaultGraphStyles(msColors) : getEntityDetailsStyles(msColors),
        layout: layoutOptions,
    });
}