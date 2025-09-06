// @ts-expect-error Necessary for compatibility with cytoscape-cise
import { CiseLayoutOptions } from "cytoscape-cise";
import Cytoscape, { ElementsDefinition } from "cytoscape";
import { CY_COLOR_BLUE, CY_COLOR_HIGHLIGHTED, CY_COLOR_NEUTRAL } from "@/api/utils";

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

const getNodeStyles = (): Cytoscape.Stylesheet[] => {
    return [
        {
            selector: "node",
            style: {
                "background-color": CY_COLOR_NEUTRAL,
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
            selector: "node.highlighted",
            style: {
                "border-width": 4,
                "border-color": CY_COLOR_HIGHLIGHTED,
                "background-color": CY_COLOR_HIGHLIGHTED,
            },
        },
        {
            selector: "node.partOfCycle",
            style: {
                "border-width": 4,
                "border-color": CY_COLOR_BLUE,
                "background-color": CY_COLOR_BLUE,
            },
        },
        {
            selector: "node.initialSubgraphNode",
            style: {
                "border-width": 4,
                "border-color": CY_COLOR_HIGHLIGHTED,
                "background-color": CY_COLOR_HIGHLIGHTED,
            },
        }
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
                "text-rotation": "autorotate",
                "text-margin-y": -10,
            },
        },
        {
            selector: "edge.highlighted",
            style: {
                "line-color": CY_COLOR_HIGHLIGHTED,
                "target-arrow-color": CY_COLOR_HIGHLIGHTED,
            },
        },
        {
            selector: "edge.partOfCycle",
            style: {
                "line-color": CY_COLOR_BLUE,
                "target-arrow-color": CY_COLOR_BLUE,
            },
        },

    ]
}

export const getCyInstance = (
    cyRef: React.MutableRefObject<HTMLDivElement | null>,
    elements: ElementsDefinition,
) => {

    const styles: Cytoscape.Stylesheet[] = [
        ...(elements.nodes && elements.nodes.length > 0 ? getNodeStyles() : []),
        ...(elements.edges && elements.edges.length > 0 ? getEdgeStyles() : [])
    ];
    return Cytoscape({
        container: cyRef.current,
        elements,
        style: styles,
        layout: layoutOptions,
    });
}