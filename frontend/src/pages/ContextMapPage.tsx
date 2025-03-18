import { ChangedLinksResponse, Field, Node } from "@/api/context-maps/types";
import CompareForm from "@/components/context-maps/compare/CompareForm";
import EntityDetail from "@/components/context-maps/EntityDetail";
import FieldDetail from "@/components/context-maps/FieldDetail";
import { getMicroservicesColors } from "@/components/context-maps/generators/colorGenerator";
import Graph from "@/components/context-maps/graphs/Graph";
import Navbar from "@/components/context-maps/Navbar";
import RenderGraph from "@/components/context-maps/RenderGraph";
import { RenderType } from "@/components/context-maps/types";
import Loading from "@/components/loading/Loading";
import { LinkDifferencesHint } from "@/components/ui/hints";
import Overlay from "@/components/ui/Overlay";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useContextMap } from "@/hooks/useContextMap";
import React, { useState, useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";

const ContextMapPage = () => {
  React.useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  const { id } = useParams();

  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [selectedField, setSelectedField] = useState<Field | null>(null);
  const [selectedRenderType, setSelectedRenderType] = useState<RenderType>(
    RenderType.BASIC_GRAPH
  );
  const [selectedContextMapChange, setSelectedContextMapChange] = useState<
    string | null
  >(null);
  const [compareUp, setCompareUp] = useState<boolean>(false);
  const [showComparisons, setShowComparisons] = useState<boolean>(false);
  const [showIsolatedNodes, setShowIsolatedNodes] = useState<boolean>(false);

  const { data: contextMap, isLoading, error } = useContextMap(id || "");

  const { toast } = useToast();

  const handleNodeClick = useCallback(
    (node: Node): void => {
      if (node === selectedNode) {
        setSelectedNode(null);
        setSelectedField(null);
      } else {
        setSelectedNode(node);
      }
    },
    [selectedNode]
  );

  const handleFieldClick = useCallback((field: Field) => {
    setSelectedField((prev) => (prev === field ? null : field));
  }, []);

  const handleCompareResponse = (resp: ChangedLinksResponse) => {
    console.log(resp);
    toast({
      title: "Comparison done",
      description: "Proceed to comparison",
    });
    setCompareUp(false);
  };

  const closeOverlay = () => {
    setSelectedNode(null);
    setSelectedField(null);
  };
  const msColors = useMemo(
    () => getMicroservicesColors(contextMap?.nodes || []),
    [contextMap]
  );
  const renderContent = () => {
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: Unable to fetch entity data.</p>;
    if (showComparisons && contextMap && selectedContextMapChange) {
      return (
        <Graph
          graphData={{
            nodes: contextMap.nodes,
            links: [],
          }}
          onNodeClick={handleNodeClick}
          contextMapChangeId={selectedContextMapChange}
          showIsolatedNodes={true}
          msColors={msColors}
        />
      );
    }
    return (
      <RenderGraph
        onNodeClick={handleNodeClick}
        contextMap={contextMap}
        renderType={selectedRenderType}
        showIsolatedNodes={showIsolatedNodes}
        msColors={msColors}
      />
    );
  };

  return id ? (
    <div className="h-screen w-screen">
      <Navbar
        setSelectedRenderType={setSelectedRenderType}
        compareBtnClick={() => setCompareUp(true)}
        isolatedNodesBtnClick={() => setShowIsolatedNodes(!showIsolatedNodes)}
        showIsolatedNodes={false}
        contextMapId={id}
        setShowComparisons={setShowComparisons}
        showComparisons={showComparisons}
        selectedContextMapChange={selectedContextMapChange}
        setSelectedContextMapChange={setSelectedContextMapChange}
        msColors={msColors}
        hintComponent={<LinkDifferencesHint />}
      />
      <Separator className="mt-2" />
      {renderContent()}
      {/* Displayed views based on state of the webpage */}
      {selectedNode && (
        <Overlay
          width="5/6"
          closeFunc={closeOverlay}
          aria-label="Entity Details"
        >
          <div className="flex justify-between">
            <EntityDetail
              entity={selectedNode}
              handleFieldClick={handleFieldClick}
            />
            {selectedField && <FieldDetail field={selectedField} />}
          </div>
        </Overlay>
      )}
      {compareUp && (
        <Overlay
          width="5/6"
          closeFunc={() => setCompareUp(false)}
          aria-label="Compare Context Map"
        >
          <CompareForm contextMapId={id} respFunc={handleCompareResponse} />
        </Overlay>
      )}
    </div>
  ) : (
    <Loading />
  );
};

export default ContextMapPage;
