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
import { useCallGraphLookup } from "@/context/CallGraphMethodLookupContext";

type GraphType = {
  callGraph: CallGraph;
  methodsMap: Map<string, CallGraphMethod>;
  showIsolatedNodes: boolean;
  msColors: Map<string, string>;
  callGraphInputId: string;
  msToHighlight: string | null;
};

const Graph: FC<GraphType> = ({
  callGraph,
  methodsMap,
  showIsolatedNodes,
  msColors,
  callGraphInputId,
  msToHighlight,
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
  const { callGraphLookupState, callGraphLookupDispatch } =
    useCallGraphLookup();

  const [methodReachabilityCG, setMethodReachabilityCG] =
    useState<CallGraph | null>(null);

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
      const nodeSet = new Set(
        (showIsolatedNodes ? callGraph.methods : visibleNodes)
          .filter((method) => method.bytecodeHash !== "null")
          .map((method) => method.methodSignature) // Collect valid method signatures
      );

      const elements: ElementsDefinition = {
        nodes: (showIsolatedNodes ? callGraph.methods : visibleNodes)
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

        edges: callGraph.calls
          .filter(
            (call: CallGraphCall) =>
              nodeSet.has(call.source) && nodeSet.has(call.target)
          ) // Filter invalid edges
          .map((call: CallGraphCall) => ({
            data: {
              id: `${call.source}__${call.target}`,
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
              "line-style": call.isInterserviceCall ? "dashed" : "solid",
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
          {
            selector: "node.highlighted",
            style: {
              "border-width": 4,
              "border-color": "#FFD700",
              "background-color": "#FFFF00",
            },
          },
        ],
        layout: layoutOptions,
      });

      setCy(cyInstance);

      cyInstance.on("tap", "node", (event) => {
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

  // highlighting method after lookup through methods table
  useEffect(() => {
    if (cy && callGraphLookupState.method) {
      const node = cy.getElementById(callGraphLookupState.method);
      if (node && node.length > 0) {
        cy.zoom({
          level: 2,
          position: node.position(),
        });

        cy.elements().removeClass("highlighted");
        node.addClass("highlighted");
      }
      callGraphLookupDispatch({ type: "REMOVE_LOOKUP" });
    }
  }, [callGraphLookupState.method, cy]);

  // highlighting methods and calls after reachability analysis of specific method
  useEffect(() => {
    if (!cy) return;

    if (methodReachabilityCG) {
      // Apply highlighting
      methodReachabilityCG.methods.forEach((method) => {
        const node = cy.getElementById(method.methodSignature);
        if (node) {
          node.style({
            "border-width": 3,
            "border-color": "#FFD700",
          });
        }
      });

      methodReachabilityCG.calls.forEach((call) => {
        const edge = cy.getElementById(`${call.source}__${call.target}`);
        if (edge) {
          edge.style({
            "line-color": "#FFD700",
            "target-arrow-color": "#FFD700",
          });
        }
      });
    }
  }, [methodReachabilityCG, cy]);

  // highlighting microservice's methods after clicking on specific microservice in "legend"
  useEffect(() => {
    if (cy && msToHighlight) {
      const highlightedNodes = cy.collection();

      callGraph.methods
        .filter((method) => method.microservice === msToHighlight)
        .forEach((method) => {
          const node = cy.getElementById(method.methodSignature);
          if (node.nonempty()) {
            node.style({
              "border-width": 5,
              "border-color": "#FFD700",
            });
            highlightedNodes.merge(node);
          }
        });

      if (highlightedNodes.nonempty()) {
        cy.fit(highlightedNodes, 50);
      }
    }
  }, [msToHighlight, cy]);

  return (
    <div ref={cyRef} className="w-full h-full relative z-0">
      {contextMenuPosition &&
        isContextMenuOpen &&
        ReactDOM.createPortal(
          <div
            ref={contextMenuRef}
            style={{
              position: "absolute",
              left: `0px`,
              top: `0px`,
              zIndex: 20,
            }}
          >
            <ContextMenu
              selectedMethod={selectedMethod}
              methodsMap={methodsMap}
              close={() => setIsContextMenuOpen(false)}
              callGraphInputId={callGraphInputId}
              setMethodReachabilityCG={setMethodReachabilityCG}
            />
          </div>,
          cyRef.current!
        )}
    </div>
  );
};

export default Graph;
