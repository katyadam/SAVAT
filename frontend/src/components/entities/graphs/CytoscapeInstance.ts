import { getChangedColor } from "@/api/utils";
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

const CY_COLOR_NEUTRAL = "#808080"

const getStyles = (msColors: Map<string, string>): Cytoscape.Stylesheet[] => {
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
    msColors: Map<string, string>
) => {

    return Cytoscape({
        container: cyRef.current,
        elements,
        style: getStyles(msColors),
        layout: layoutOptions,
    });
}