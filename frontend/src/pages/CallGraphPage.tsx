import Graph from "@/components/callgraphs/graphs/Graph";
import { useCallGraphInput } from "@/hooks/useCallGraph";
import { useParams } from "react-router-dom";

const CallGraphPage = () => {
  const { id } = useParams();
  if (!id) return <p>Error... Incorrect ID</p>;

  const { data: callGraph, isLoading, error } = useCallGraphInput(id);

  const renderContent = () => {
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: Unable to fetch entity data.</p>;
    if (callGraph) {
      // if (showComparisons) {
      // return (
      // <DiffGraph
      // graphDiff={{
      // nodes: graph.nodes,
      // links: [],
      // }}
      // commGraphDiffId={selectedCommGraphDiff}
      // />
      // );
      return <Graph callGraph={callGraph.callGraph} />;
    }
  };

  return <div className="w-screen h-screen">{renderContent()}</div>;
};

export default CallGraphPage;
