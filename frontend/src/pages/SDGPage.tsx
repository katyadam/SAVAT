import CompareForm from "@/components/sdgs/CompareForm";
import Graph from "@/components/sdgs/graphs/Graph";
import Navbar from "@/components/sdgs/Navbar";
import Loading from "@/components/loading/Loading";
import { LinkDifferencesHint } from "@/components/ui/hints";
import Overlay from "@/components/ui/Overlay";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import React, { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { useSDG } from "@/hooks/useSDG";
import { ChangedLink, ChangedLinksResponse, Link } from "@/api/sdgs/types";
import LinkPanel from "@/components/sdgs/LinkPanel";

const SDGPage = () => {
  React.useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  const { id } = useParams();

  const { data: graph, isLoading, error } = useSDG(id || "");
  const [compareUp, setCompareUp] = useState<boolean>(false);
  const [selectedCommGraphDiff, setSelectedCommGraphDiff] = useState<
    string | null
  >(null);
  const [showComparisons, setShowComparisons] = useState<boolean>(false);

  const [selectedLink, selectLink] = useState<Link | null>(null);
  const [selectedNode, selectNode] = useState<string | null>(null);

  const handleLinkClick = useCallback(
    (link: Link | ChangedLink): void => {
      if (link === selectedLink) {
        selectLink(null);
      } else {
        selectLink(link);
      }
    },
    [selectedLink]
  );

  const handleNodeClick = useCallback(
    (node: string): void => {
      if (node === selectedNode) {
        selectNode(null);
      } else {
        selectNode(node);
      }
    },
    [selectedLink]
  );

  const { toast } = useToast();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: Unable to fetch entity data.</p>;

  const handleCompareResponse = (resp: ChangedLinksResponse) => {
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
            changedSDGId={selectedCommGraphDiff}
            selectLink={handleLinkClick}
            selectNode={handleNodeClick}
            selectedNode={selectedNode}
          />
        );
      }
      return (
        <Graph
          graph={graph}
          selectLink={handleLinkClick}
          selectNode={selectNode}
          selectedNode={selectedNode}
        />
      );
    }
  };

  return id ? (
    <>
      <div className="h-screen w-screen">
        <Navbar
          compareBtnClick={() => setCompareUp(true)}
          sdgId={id}
          setSelectedSDGChange={setSelectedCommGraphDiff}
          setShowComparisons={setShowComparisons}
          showComparisons={showComparisons}
          hintComponent={<LinkDifferencesHint />}
          removeHighlight={() => selectNode(null)}
        />
        <Separator className="mt-2" />
        {renderContent()}
        {compareUp && (
          <Overlay
            width="5/6"
            closeFunc={() => setCompareUp(false)}
            aria-label="Compare Entities"
          >
            <CompareForm sdgId={id} respFunc={handleCompareResponse} />
          </Overlay>
        )}
      </div>
      {selectedLink && (
        <Overlay width="1/2" closeFunc={() => selectLink(null)}>
          <LinkPanel link={selectedLink} />
        </Overlay>
      )}
    </>
  ) : (
    <Loading />
  );
};

export default SDGPage;
