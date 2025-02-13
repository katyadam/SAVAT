// @ts-ignore
import { CiseLayoutOptions } from "cytoscape-cise";
import Cytoscape, { ElementsDefinition } from "cytoscape";

const layoutOptions: CiseLayoutOptions = {
    name: "cise",
    fit: true,
    clusters: (node: any) => node.data("id").split("/")[0],
    nodeSeparation: 30,
    padding: 10,
    clustering: true,
    nodeDimensionsIncludeLabels: true,
    maxIterations: 100,
    gravity: 0.5,
    direction: "horizontal",
};

export const getCyInstance = (
    cyRef: React.MutableRefObject<HTMLDivElement | null>,
    elements: ElementsDefinition,
    msColors: Map<string, string>
) => {
    return Cytoscape({
        container: cyRef.current,
        elements,
        style: [
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
                        msColors.get(ele.data("microservice")) || "#808080",
                },
            },
            {
                selector: "edge",
                style: {
                    width: 5,
                    "line-color": "#808080",
                    "curve-style": "bezier",
                    "target-arrow-color": "#808080",
                    "target-arrow-shape": "triangle",
                    label: "data(label)",
                    "text-rotation": "autorotate",
                    "text-margin-y": -10,
                },
            },
            {
                selector: "edge[isInterserviceCall = 'true']",
                style: {
                    "line-color": "#ff4d4d",
                    "target-arrow-color": "#ff4d4d",
                    "line-style": "dashed",
                },
            },
            {
                selector: "edge[isInterserviceCall = 'false']",
                style: {
                    "line-color": "#4CAF50",
                    "target-arrow-color": "#4CAF50",
                    "line-style": "solid",
                },
            },
            {
                selector: "node.highlighted",
                style: {
                    "border-width": 4,
                    "border-color": "#FFD700",
                },
            },
            {
                selector: "edge.highlighted",
                style: {
                    "line-color": "#FFD700",
                    "target-arrow-color": "#FFD700",
                },
            },
        ],
        layout: layoutOptions,
    });
}