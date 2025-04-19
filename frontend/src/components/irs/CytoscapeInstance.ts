// @ts-expect-error Necessary for compatibility with cytoscape-cise
import { CiseLayoutOptions } from "cytoscape-cise";
import Cytoscape, { ElementsDefinition } from "cytoscape";
import { CY_COLOR_NEUTRAL } from "@/api/utils";

const layoutOptions: CiseLayoutOptions = {
    name: "cise",
    fit: true,
    clusters: (node: Cytoscape.NodeSingular) => node.data("id").split("/")[0],
    nodeSeparation: 30,
    padding: 10,
    clustering: true,
    nodeDimensionsIncludeLabels: true,
    maxIterations: 100,
    gravity: 0.5,
    direction: "horizontal",
};

const getNodeStyles = (msColors: Map<string, string>): Cytoscape.Stylesheet[] => {
    return [
        {
            selector: "node",
            style: {
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
            selector: "node[microservice]",
            style: {
                "background-color": (ele) =>
                    msColors.get(ele.data("microservice")) || CY_COLOR_NEUTRAL,
            },
        },
    ]
}

const getEdgeStyles = (): Cytoscape.Stylesheet[] => {
    return [
        {
            selector: "edge",
            style: {
                width: 4,
                "line-color": CY_COLOR_NEUTRAL,
                "curve-style": "bezier",
                "target-arrow-color": CY_COLOR_NEUTRAL,
                "target-arrow-shape": "triangle",
                label: "data(label)",
                "text-rotation": "autorotate",
                "text-margin-y": -10,
            },
        },
    ]
}

export const getCyInstance = (
    cyRef: React.MutableRefObject<HTMLDivElement | null>,
    elements: ElementsDefinition,
    msColors: Map<string, string>
) => {

    const styles: Cytoscape.Stylesheet[] = [
        ...(elements.nodes && elements.nodes.length > 0 ? getNodeStyles(msColors) : []),
        ...(elements.edges && elements.edges.length > 0 ? getEdgeStyles() : [])
    ];
    return Cytoscape({
        container: cyRef.current,
        elements,
        style: styles,
        layout: layoutOptions,
    });
}