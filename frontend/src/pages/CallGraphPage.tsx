import Graph from "@/components/callgraphs/graphs/Graph";
import Navbar from "@/components/callgraphs/Navbar";
import { Separator } from "@/components/ui/separator";
import { useCallGraphInput } from "@/hooks/useCallGraph";
import React, { useState } from "react";
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
  const [showIsolatedNodes, setShowIsolatedNodes] = useState<boolean>(false);

  const renderContent = () => {
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: Unable to fetch entity data.</p>;
    if (callGraph) {
      return (
        <Graph
          callGraph={callGraph.callGraph}
          showIsolatedNodes={showIsolatedNodes}
        />
      );
    }
  };

  return (
    <div className="w-screen h-screen">
      <Navbar
        isolatedNodesBtnClick={() => setShowIsolatedNodes(!showIsolatedNodes)}
      />
      <Separator className="mt-2" />
      {renderContent()}
    </div>
  );
};

export default CallGraphPage;
