import { CallGraphMethod } from "@/api/callgraphs/types";
import { indexCallGraphMethods } from "@/api/callgraphs/utils";
import { getMicroservicesColors } from "@/components/callgraphs/generators/colorGenerator";
import Graph from "@/components/callgraphs/graphs/Graph";
import { useCallGraphOutput } from "@/hooks/useCallGraphOutput";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Action } from "./CallGraphPage";
import { Separator } from "@/components/ui/separator";
import Loading from "@/components/loading/Loading";
import Navbar from "@/components/callgraphs/Navbar";

const CallGraphOutputPage = () => {
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);
  const { id } = useParams();
  if (!id) return <p>Error... Incorrect ID</p>;
  const { data: changedCallGraph, isLoading, error } = useCallGraphOutput(id);
  const [callGraphMethodsMap, setCallGraphMethodsMap] = useState<Map<
    string,
    CallGraphMethod
  > | null>(null);

  const [msColors, setMsColors] = useState<Map<string, string> | null>();
  const [msToHighlight, setMsToHighlight] = useState<string | null>(null);

  useEffect(() => {
    if (changedCallGraph) {
      setMsColors(getMicroservicesColors(changedCallGraph.methods));
      setCallGraphMethodsMap(indexCallGraphMethods(changedCallGraph.methods));
    }
  }, [changedCallGraph]);

  const [actionsStorage, setActionsStorage] = useState<Action[]>([]);
  const [removedAction, setRemovedAction] = useState<Action | null>(null);

  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);

  const renderContent = () => {
    if (error) return <p>Error: Unable to fetch call graph inputs.</p>;
    if (changedCallGraph && msColors && callGraphMethodsMap && !isLoading) {
      return (
        <Graph
          callGraph={changedCallGraph}
          methodsMap={callGraphMethodsMap}
          showIsolatedNodes={true}
          msColors={msColors}
          inputId={id}
          msToHighlight={msToHighlight}
          setActionsStorage={setActionsStorage}
          actionsStorage={actionsStorage}
          actionToRemove={removedAction}
          isContextMenuOpen={isContextMenuOpen}
          setIsContextMenuOpen={setIsContextMenuOpen}
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
          closeContextMenu={() => setIsContextMenuOpen(false)}
        />
      )}
      <Separator className="mt-2" />
      {renderContent()}
    </div>
  );
};

export default CallGraphOutputPage;
