import { CallGraphCall, CallGraphMethod } from "@/api/callgraphs/types";
import {
  indexCallGraphCalls,
  indexCallGraphMethods,
} from "@/api/callgraphs/utils";
import { getMicroservicesColors } from "@/components/callgraphs/generators/colorGenerator";
import Graph from "@/components/callgraphs/graphs/Graph";
import Navbar from "@/components/callgraphs/Navbar";
import ExplorePanel from "@/components/callgraphs/reachability/ExplorePanel";
import Loading from "@/components/loading/Loading";
import { CallGraphInputHint } from "@/components/ui/hints";
import Overlay from "@/components/ui/Overlay";
import { Separator } from "@/components/ui/separator";
import { useCallGraphMethodReach } from "@/context/CallGraphMethodReachContext";
import { useCallGraphInput } from "@/hooks/useCallGraph";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export type Action = {
  id: number;
  methodIds: string[];
  calls: {
    callId: string;
    isInterservice: boolean;
  }[];
  timestamp: string;
};

const CallGraphPage = () => {
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);
  const { id } = useParams();

  const { data: callGraph, isLoading, error } = useCallGraphInput(id || "");
  const [callGraphMethodsMap, setCallGraphMethodsMap] = useState<Map<
    string,
    CallGraphMethod
  > | null>(null);

  const [callGraphCallsMap, setCallGraphCallsMap] = useState<Map<
    string,
    CallGraphCall
  > | null>(null);

  const { cgMethodReachState, cgMethodReachDispatch } =
    useCallGraphMethodReach();
  console.log(
    cgMethodReachState.methodSignature,
    cgMethodReachState.reachValue
  );
  const [showIsolatedNodes, setShowIsolatedNodes] = useState<boolean>(false);
  const [msColors, setMsColors] = useState<Map<string, string> | null>();
  const [msToHighlight, setMsToHighlight] = useState<string | null>(null);

  useEffect(() => {
    if (callGraph) {
      setMsColors(getMicroservicesColors(callGraph?.callGraph.methods));
      setCallGraphMethodsMap(
        indexCallGraphMethods(callGraph.callGraph.methods)
      );
      setCallGraphCallsMap(indexCallGraphCalls(callGraph.callGraph.calls));
    }
  }, [callGraph]);

  const [actionsStorage, setActionsStorage] = useState<Action[]>([]);
  const [removedAction, setRemovedAction] = useState<Action | null>(null);

  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  const [isEdgeContextMenuOpen, setIsEdgeContextMenuOpen] = useState(false);

  const renderContent = () => {
    if (error || !id) return <p>Error: Unable to fetch call graph inputs.</p>;
    if (
      callGraph &&
      msColors &&
      callGraphMethodsMap &&
      callGraphCallsMap &&
      !isLoading
    ) {
      return (
        <Graph
          callGraph={callGraph.callGraph}
          methodsMap={callGraphMethodsMap}
          callsMap={callGraphCallsMap}
          showIsolatedNodes={showIsolatedNodes}
          msColors={msColors}
          inputId={id}
          msToHighlight={msToHighlight}
          setActionsStorage={setActionsStorage}
          actionsStorage={actionsStorage}
          actionToRemove={removedAction}
          isContextMenuOpen={isContextMenuOpen}
          setIsContextMenuOpen={setIsContextMenuOpen}
          isEdgeContextMenuOpen={isEdgeContextMenuOpen}
          setIsEdgeContextMenuOpen={setIsEdgeContextMenuOpen}
          variant="inputs"
        />
      );
    }
    return <Loading />;
  };

  return (
    <div className="w-screen h-screen">
      {msColors && callGraph && (
        <Navbar
          isolatedNodesBtnClick={() => setShowIsolatedNodes(!showIsolatedNodes)}
          msColorsLegend={msColors}
          setMsToHighlight={setMsToHighlight}
          methods={callGraph.callGraph.methods}
          setActionsStorage={setActionsStorage}
          actionsStorage={actionsStorage}
          setRemovedAction={setRemovedAction}
          closeContextMenu={() => {
            setIsContextMenuOpen(false);
            setIsEdgeContextMenuOpen(false);
          }}
          hintComponent={<CallGraphInputHint />}
        />
      )}
      <Separator className="mt-2" />
      {renderContent()}
      {callGraph &&
        msColors &&
        cgMethodReachState.methodSignature &&
        cgMethodReachState.reachValue &&
        cgMethodReachState.reachValue > 0 && (
          <Overlay
            closeFunc={() =>
              cgMethodReachDispatch({ type: "REMOVE_METHOD_REACH" })
            }
            width={"5/6"}
          >
            <ExplorePanel
              callGraph={callGraph?.callGraph}
              msColors={msColors}
            />
          </Overlay>
        )}
    </div>
  );
};

export default CallGraphPage;
