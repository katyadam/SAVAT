// @ts-expect-error Necessary for compatibility with cytoscape-cise
import { CiseLayoutOptions } from "cytoscape-cise";
import Cytoscape, { ElementsDefinition } from "cytoscape";
import { CY_COLOR_NEUTRAL, CY_COLOR_GREEN, CY_COLOR_BLUE, CY_COLOR_RED, CY_COLOR_HIGHLIGHTED, CY_COLOR_BLACK } from "@/api/utils";

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
            selector: "node.highlighted",
            style: {
                "border-width": 4,
                "border-color": CY_COLOR_HIGHLIGHTED,
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
        {
            selector: "edge[isInterserviceCall = 'true']",
            style: {
                width: 5,
                "line-color": CY_COLOR_BLACK,
                "target-arrow-color": CY_COLOR_BLACK,
                "line-style": "dashed",
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