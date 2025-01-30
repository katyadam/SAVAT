import { CallGraphMethod } from "@/api/callgraphs/types";
import { indexCallGraphMethods } from "@/api/callgraphs/utils";
import { getMicroservicesColors } from "@/components/callgraphs/generators/colorGenerator";
import Graph from "@/components/callgraphs/graphs/Graph";
import Navbar from "@/components/callgraphs/Navbar";
import { Separator } from "@/components/ui/separator";
import { useCallGraphInput } from "@/hooks/useCallGraph";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CallGraphPage = () => {
  React.useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);
  const { id } = useParams();
  if (!id) return <p>Error... Incorrect ID</p>;

  const { data: callGraph, isLoading, error } = useCallGraphInput(id);
  const [callGraphMethodsMap, setCallGraphMethodsMap] = useState<Map<
    string,
    CallGraphMethod
  > | null>(null);
  const [showIsolatedNodes, setShowIsolatedNodes] = useState<boolean>(false);
  const [msColors, setMsColors] = useState<Map<string, string> | null>();
  const [msToHighlight, setMsToHighlight] = useState<string | null>(null);

  useEffect(() => {
    if (callGraph) {
      setMsColors(getMicroservicesColors(callGraph?.callGraph.methods));
      setCallGraphMethodsMap(
        indexCallGraphMethods(callGraph.callGraph.methods)
      );
    }
  }, [callGraph]);

  const renderContent = () => {
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: Unable to fetch entity data.</p>;
    if (callGraph && msColors && callGraphMethodsMap) {
      return (
        <Graph
          callGraph={callGraph.callGraph}
          methodsMap={callGraphMethodsMap}
          showIsolatedNodes={showIsolatedNodes}
          msColors={msColors}
          callGraphInputId={id}
          msToHighlight={msToHighlight}
        />
      );
    }
  };

  return (
    <div className="w-screen h-screen">
      {msColors && (
        <Navbar
          isolatedNodesBtnClick={() => setShowIsolatedNodes(!showIsolatedNodes)}
          msColorsLegend={msColors}
          setMsToHighlight={setMsToHighlight}
        />
      )}
      <Separator className="mt-2" />
      {renderContent()}
    </div>
  );
};

export default CallGraphPage;
