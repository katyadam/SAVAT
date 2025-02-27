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

const CallGraphOutputPage = () => {
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);
  const { id } = useParams();
  const {
    data: changedCallGraph,
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

  const [msColors, setMsColors] = useState<Map<string, string> | null>();
  const [msToHighlight, setMsToHighlight] = useState<string | null>(null);

  useEffect(() => {
    if (changedCallGraph) {
      setMsColors(getMicroservicesColors(changedCallGraph.methods));
      setCallGraphMethodsMap(indexCallGraphMethods(changedCallGraph.methods));
      setCallGraphCallsMap(indexCallGraphCalls(changedCallGraph.calls));
    }
  }, [changedCallGraph]);

  const [actionsStorage, setActionsStorage] = useState<Action[]>([]);
  const [removedAction, setRemovedAction] = useState<Action | null>(null);

  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  const [isEdgeContextMenuOpen, setIsEdgeContextMenuOpen] = useState(false);

  const renderContent = () => {
    if (error || !id) return <p>Error: Unable to fetch call graph inputs.</p>;
    if (
      changedCallGraph &&
      msColors &&
      callGraphMethodsMap &&
      callGraphCallsMap &&
      !isLoading
    ) {
      return (
        <Graph
          callGraph={changedCallGraph}
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
      {msColors && changedCallGraph && (
        <Navbar
          isolatedNodesBtnClick={null}
          msColorsLegend={msColors}
          setMsToHighlight={setMsToHighlight}
          methods={changedCallGraph.methods}
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
    </div>
  );
};

export default CallGraphOutputPage;
