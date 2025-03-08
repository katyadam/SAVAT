import { CompareCommGraphLinksResponse } from "@/api/communication-graphs/types";
import CompareForm from "@/components/sdgs/CompareForm";
import Graph from "@/components/sdgs/graphs/Graph";
import Navbar from "@/components/sdgs/Navbar";
import Loading from "@/components/loading/Loading";
import { LinkDifferencesHint } from "@/components/ui/hints";
import Overlay from "@/components/ui/Overlay";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
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

  const { data: graph, isLoading, error } = useCommGraph(id || "");
  const [compareUp, setCompareUp] = useState<boolean>(false);
  const [selectedCommGraphDiff, setSelectedCommGraphDiff] = useState<
    string | null
  >(null);
  const [showComparisons, setShowComparisons] = useState<boolean>(false);

  const { toast } = useToast();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: Unable to fetch entity data.</p>;

  const handleCompareResponse = (resp: CompareCommGraphLinksResponse) => {
    console.log(resp);
    toast({
      title: "Comparison done",
      description: "Proceed to comparison",
    });
    setCompareUp(false);
  };

  const renderContent = () => {
    if (isLoading) return <Loading />;
    if (error) return <p>Error: Unable to fetch entity data.</p>;
    if (graph) {
      if (showComparisons && selectedCommGraphDiff) {
        return (
          <Graph
            graph={{
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

  return id ? (
    <div className="h-screen w-screen">
      <Navbar
        compareBtnClick={() => setCompareUp(true)}
        analysisInputId={id}
        setSelectedCommGraphDiff={setSelectedCommGraphDiff}
        setShowComparisons={setShowComparisons}
        showComparisons={showComparisons}
        hintComponent={<LinkDifferencesHint />}
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
  ) : (
    <Loading />
  );
};

export default GraphPage;
