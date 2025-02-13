import { FC, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import Cytoscape, { ElementsDefinition } from "cytoscape";
// @ts-ignore
import cise, { CiseLayoutOptions } from "cytoscape-cise";
import {
  CallGraph,
  CallGraphCall,
  CallGraphMethod,
  GenericCallGraph,
  TypeOfChange,
} from "@/api/callgraphs/types";
import cytoscape from "cytoscape";
import ContextMenu from "../ContextMenu";
import { useCallGraphLookup } from "@/context/CallGraphMethodLookupContext";
import { Action } from "@/pages/CallGraphPage";
import {
  useHighlightMethod,
  useHighlightMicroservice,
  useHighlightReachability,
  useRemoveAction,
} from "@/hooks/useGraphEffects";
import { getCyInstance } from "./CytoscapeInstance";

type GraphType = {
  callGraph: GenericCallGraph;
  methodsMap: Map<string, CallGraphMethod>;
  showIsolatedNodes: boolean;
  msColors: Map<string, string>;
  callGraphInputId: string;
  msToHighlight: string | null;
  setActionsStorage: (actionStorage: Action[]) => void;
  actionsStorage: Action[];
  actionToRemove: Action | null;
  isContextMenuOpen: boolean;
  setIsContextMenuOpen: (arg: boolean) => void;
};

const Graph: FC<GraphType> = ({
  callGraph,
  methodsMap,
  showIsolatedNodes,
  msColors,
  callGraphInputId,
  msToHighlight,
  setActionsStorage,
  actionsStorage,
  actionToRemove,
  isContextMenuOpen,
  setIsContextMenuOpen,
}) => {
  const cyRef = useRef<HTMLDivElement | null>(null);
  const contextMenuRef = useRef<HTMLDivElement | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [contextMenuPosition, setContextMenuPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

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
          .map((method) => ({
            data: {
              id: method.methodSignature,
              label: method.name || "Unnamed",
              parent: method.microservice,
              microservice: method.microservice,
              typeOfChange:
                "typeOfChange" in method
                  ? (method.typeOfChange as TypeOfChange)
                  : TypeOfChange.NONE,
            },
            group: "nodes",
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
              label: call.httpMethod || "",
              isInterserviceCall: call.isInterserviceCall ? "true" : "false",
            },
            group: "edges",
          })),
      };
      console.log(elements);
      const cyInstance = getCyInstance(cyRef, elements, msColors);

      setCy(cyInstance);

      cyInstance.on("tap", "node", (event) => {
        const node = event.target;
        const nodePosition = node.renderedPosition();
        setContextMenuPosition({
          x: nodePosition.x + 10,
          y: nodePosition.y + 10,
        });
        setSelectedMethod(node.data("id"));

        setIsContextMenuOpen(true);
      });

      setActionsStorage([]);

      return () => {
        cyInstance.destroy();
      };
    }
  }, [callGraph, showIsolatedNodes]);

  useHighlightMethod(
    cy,
    callGraphLookupState.method,
    actionsStorage,
    setActionsStorage,
    () => callGraphLookupDispatch({ type: "REMOVE_LOOKUP" })
  );

  useHighlightReachability(
    cy,
    methodReachabilityCG,
    actionsStorage,
    setActionsStorage
  );

  useHighlightMicroservice(
    cy,
    msToHighlight,
    callGraph,
    actionsStorage,
    setActionsStorage
  );

  useRemoveAction(cy, actionToRemove);

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
