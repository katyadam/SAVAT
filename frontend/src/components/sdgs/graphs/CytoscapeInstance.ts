import { CY_COLOR_HIGHLIGHTED, getChangedColor } from "@/api/utils";
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
    edgeElasticity: 0.02,
    idealEdgeLength: 200
};

const styles: Cytoscape.Stylesheet[] = [
    {
        selector: "node",
        style: {
            "background-color": "black",
            shape: "round-octagon",
            width: "30",
            height: "30",
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
            width: 2,
            "line-color": (ele) => getChangedColor(ele.data("typeOfChange")),
            "curve-style": "bezier",
            "target-arrow-color": (ele) => getChangedColor(ele.data("typeOfChange")),
            "target-arrow-shape": "triangle",
        },
    },
    {
        selector: "node.highlighted",
        style: {
            "border-width": 4,
            "border-color": CY_COLOR_HIGHLIGHTED,
        },
    },
    {
        selector: "edge.highlighted",
        style: {
            "line-color": CY_COLOR_HIGHLIGHTED,
            "target-arrow-color": CY_COLOR_HIGHLIGHTED,
        },
    },
]

export const getCyInstance = (
    cyRef: React.MutableRefObject<HTMLDivElement | null>,
    elements: ElementsDefinition,
) => {

    return Cytoscape({
        container: cyRef.current,
        elements,
        style: styles,
        layout: layoutOptions,
    });
}