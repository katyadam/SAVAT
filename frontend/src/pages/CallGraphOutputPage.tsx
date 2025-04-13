import { CallGraphCall, CallGraphMethod } from "@/api/callgraphs/types";
import {
  indexCallGraphCalls,
  indexCallGraphMethods,
} from "@/api/callgraphs/utils";
import { getMicroservicesColors } from "@/components/callgraphs/generators/colorGenerator";
import Graph from "@/components/callgraphs/graphs/Graph";
import { useCallGraphOutput } from "@/hooks/useCallGraphOutput";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Action } from "./CallGraphPage";
import { Separator } from "@/components/ui/separator";
import Loading from "@/components/loading/Loading";
import Navbar from "@/components/callgraphs/Navbar";
import { CallGraphOutputHint } from "@/components/ui/hints";
import { useCallGraphMethodReach } from "@/context/CallGraphMethodReachContext";
import Overlay from "@/components/ui/Overlay";
import ExplorePanel from "@/components/callgraphs/reachability/ExplorePanel";

const CallGraphOutputPage = () => {
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);
  const { id } = useParams();
  const {
    data: callGraphOutput,
    isLoading,
    error,
  } = useCallGraphOutput(id || "");

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

  const [msColors, setMsColors] = useState<Map<string, string> | null>();
  const [msToHighlight, setMsToHighlight] = useState<string | null>(null);

  useEffect(() => {
    if (callGraphOutput && callGraphOutput.changedCallGraph) {
      setMsColors(
        getMicroservicesColors(callGraphOutput.changedCallGraph.methods)
      );
      setCallGraphMethodsMap(
        indexCallGraphMethods(callGraphOutput.changedCallGraph.methods)
      );
      setCallGraphCallsMap(
        indexCallGraphCalls(callGraphOutput.changedCallGraph.calls)
      );
    }
  }, [callGraphOutput]);

  const [actionsStorage, setActionsStorage] = useState<Action[]>([]);
  const [removedAction, setRemovedAction] = useState<Action | null>(null);

  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  const [isEdgeContextMenuOpen, setIsEdgeContextMenuOpen] = useState(false);

  const renderContent = () => {
    if (error || !id) return <p>Error: Unable to fetch call graph inputs.</p>;
    if (
      callGraphOutput &&
      callGraphOutput.changedCallGraph &&
      msColors &&
      callGraphMethodsMap &&
      callGraphCallsMap &&
      !isLoading
    ) {
      return (
        <Graph
          callGraph={callGraphOutput.changedCallGraph}
          methodsMap={callGraphMethodsMap}
          callsMap={callGraphCallsMap}
          showIsolatedNodes={true}
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
          variant="outputs"
        />
      );
    }
    return <Loading />;
  };

  return (
    <div className="w-screen h-screen">
      {msColors && callGraphOutput && callGraphOutput.changedCallGraph && (
        <Navbar
          isolatedNodesBtnClick={null}
          msColorsLegend={msColors}
          setMsToHighlight={setMsToHighlight}
          methods={callGraphOutput.changedCallGraph.methods}
          setActionsStorage={setActionsStorage}
          actionsStorage={actionsStorage}
          setRemovedAction={setRemovedAction}
          closeContextMenu={() => {
            setIsContextMenuOpen(false);
            setIsEdgeContextMenuOpen(false);
          }}
          hintComponent={<CallGraphOutputHint />}
        />
      )}
      <Separator className="mt-2" />
      {renderContent()}
      {callGraphOutput &&
        callGraphOutput.changedCallGraph &&
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
              callGraph={callGraphOutput.changedCallGraph}
              msColors={msColors}
            />
          </Overlay>
        )}
    </div>
  );
};

export default CallGraphOutputPage;
