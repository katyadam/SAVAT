import { CompareCommGraphLinksResponse } from "@/api/communication-graphs/types";
import CompareForm from "@/components/communication-graphs/CompareForm";
import DiffGraph from "@/components/communication-graphs/graphs/DiffGraph";
import Graph from "@/components/communication-graphs/graphs/Graph";
import Navbar from "@/components/communication-graphs/Navbar";
import Overlay from "@/components/ui/Overlay";
import { Separator } from "@/components/ui/separator";
import { useCommGraph } from "@/hooks/useCommGraph";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

const GraphPage = () => {
  React.useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  const { id } = useParams();
  if (!id) return <p>Error... Incorrect ID</p>;

  const { data: graph, isLoading, error } = useCommGraph(id);
  const [compareUp, setCompareUp] = useState<boolean>(false);
  const [selectedCommGraphDiff, setSelectedCommGraphDiff] = useState<
    string | null
  >(null);
  const [showComparisons, setShowComparisons] = useState<boolean>(false);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: Unable to fetch entity data.</p>;

  const handleCompareResponse = (resp: CompareCommGraphLinksResponse) => {
    console.log(resp);
    alert("Comparison done. Proceed to 'Show differences'"); // TODO: Toast
    setCompareUp(false);
  };

  const renderContent = () => {
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: Unable to fetch entity data.</p>;
    if (graph) {
      if (showComparisons) {
        return (
          <DiffGraph
            graphDiff={{
              nodes: graph.nodes,
              links: [],
            }}
            commGraphDiffId={selectedCommGraphDiff}
          />
        );
      }
      return <Graph graph={graph} />;
    }
  };

  return (
    <div className="h-screen w-screen">
      <Navbar
        compareBtnClick={() => setCompareUp(true)}
        analysisInputId={id}
        setSelectedCommGraphDiff={setSelectedCommGraphDiff}
        setShowComparisons={setShowComparisons}
        showComparisons={showComparisons}
      />
      <Separator className="mt-2" />
      {renderContent()}
      {compareUp && (
        <Overlay
          width="5/6"
          closeFunc={() => setCompareUp(false)}
          aria-label="Compare Entities"
        >
          <CompareForm analysisInputId={id} respFunc={handleCompareResponse} />
        </Overlay>
      )}
    </div>
  );
};

export default GraphPage;
