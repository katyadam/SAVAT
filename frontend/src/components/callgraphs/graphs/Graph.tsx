import { FC, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import Cytoscape, { ElementsDefinition } from "cytoscape";
// @ts-ignore
import cise, { CiseLayoutOptions } from "cytoscape-cise";
import {
  CallGraph,
  CallGraphCall,
  CallGraphMethod,
} from "@/api/callgraphs/types";
import cytoscape from "cytoscape";
import ContextMenu from "../ContextMenu";

type GraphType = {
  callGraph: CallGraph;
  methodsMap: Map<string, CallGraphMethod>;
  showIsolatedNodes: boolean;
  msColors: Map<string, string>;
};

const Graph: FC<GraphType> = ({
  callGraph,
  methodsMap,
  showIsolatedNodes,
  msColors,
}) => {
  const cyRef = useRef<HTMLDivElement | null>(null);
  const contextMenuRef = useRef<HTMLDivElement | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [contextMenuPosition, setContextMenuPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  const [cy, setCy] = useState<Cytoscape.Core | null>(null);

  const getNonIsolatedNodes = (
    nodes: CallGraphMethod[],
    links: CallGraphCall[]
  ): CallGraphMethod[] => {
    const linkedNodeNames = new Set<string>();

    links.forEach((link) => {
      linkedNodeNames.add(link.source);
      linkedNodeNames.add(link.target);
    });
    return nodes.filter((node) => linkedNodeNames.has(node.methodSignature));
  };

  cytoscape.use(cise);

  useEffect(() => {
    if (cyRef.current) {
      const visibleNodes = getNonIsolatedNodes(
        callGraph.methods,
        callGraph.calls
      );
      const elements: ElementsDefinition = {
        nodes: (showIsolatedNodes ? visibleNodes : callGraph.methods)
          .filter((method) => method.bytecodeHash !== "null")
          .map((method: CallGraphMethod) => ({
            data: {
              id: method.methodSignature,
              label: method.name,
              parent: method.microservice,
            },
            group: "nodes",
            style: {
              "background-color": msColors.get(method.microservice),
            },
          })),
        edges: callGraph.calls.map((call: CallGraphCall) => ({
          data: {
            source: call.source,
            target: call.target,
            label: call.httpMethod,
          },
          group: "edges",
          style: {
            "line-color": call.isInterserviceCall ? "#ff4d4d" : "#4CAF50",
            "target-arrow-color": call.isInterserviceCall
              ? "#ff4d4d"
              : "#4CAF50",
          },
        })),
      };

      const layoutOptions: CiseLayoutOptions = {
        name: "cise",
        fit: true,
        clusters: (node: any) => node.data("id").split("/")[0],
        nodeSeparation: 30,
        padding: 10,
        clustering: true,
        nodeDimensionsIncludeLabels: true,
        maxIterations: 10000,
        clusterThreshold: 0.1,
        gravity: 0.5,
        direction: "horizontal",
      };

      const cyInstance = Cytoscape({
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
        ],
        layout: layoutOptions,
      });

      setCy(cyInstance);

      cyInstance.on("tap", "node", (event) => {
        const node = event.target;
        const currentZoom = cyInstance.zoom();
        const zoomIncrement = 0.2;
        const newZoom = currentZoom + zoomIncrement;

        cyInstance.zoom({
          level: newZoom,
          renderedPosition: node.renderedPosition(),
        });
      });

      cyInstance.on("cxttap", "node", (event) => {
        const node = event.target;
        const nodePosition = node.renderedPosition();
        console.log(node.data("id"));

        setContextMenuPosition({
          x: nodePosition.x + 10,
          y: nodePosition.y + 10,
        });
        setSelectedMethod(node.data("id"));

        setIsContextMenuOpen(true);
      });

      return () => {
        cyInstance.destroy();
      };
    }
  }, [callGraph, showIsolatedNodes]);

  // Close the context menu when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        contextMenuRef.current &&
        !contextMenuRef.current.contains(event.target as Node)
      ) {
        // If the click is outside the context menu, hide it
        setIsContextMenuOpen(false);
      }
    };

    // Add event listener to the document
    document.addEventListener("click", handleClickOutside);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (cy) {
      if (isContextMenuOpen) {
        cy.userPanningEnabled(false);
        cy.userZoomingEnabled(false);
        cy.boxSelectionEnabled(false);
        cy.panningEnabled(false);
        cy.zoomingEnabled(false);
      } else {
        cy.userPanningEnabled(true);
        cy.userZoomingEnabled(true);
        cy.boxSelectionEnabled(true);
        cy.panningEnabled(true);
        cy.zoomingEnabled(true);
      }
    }
  }, [isContextMenuOpen, cy]);

  return (
    <div ref={cyRef} className="w-full h-full relative z-0">
      {contextMenuPosition &&
        isContextMenuOpen &&
        ReactDOM.createPortal(
          <div
            ref={contextMenuRef}
            style={{
              position: "absolute",
              left: `${contextMenuPosition.x}px`,
              top: `${contextMenuPosition.y}px`,
              zIndex: 20,
            }}
          >
            <ContextMenu
              selectedMethod={selectedMethod}
              methodsMap={methodsMap}
            />
          </div>,
          cyRef.current!
        )}
    </div>
  );
};

export default Graph;
