import Graph from "@/components/communication-graphs/Graph";
import { useCommGraph } from "@/hooks/useCommGraph";
import React from "react";
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

  const renderContent = () => {
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: Unable to fetch entity data.</p>;
    console.log(graph);

    return graph ? <Graph graph={graph} /> : <p>Loading...</p>;
  };

  return <div className="h-screen w-screen">{renderContent()}</div>;
};

export default GraphPage;
