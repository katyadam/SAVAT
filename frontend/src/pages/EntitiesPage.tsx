import { EntityNode, EntityField } from "@/api/entities/types";
import { CompareEntitiesLinksResponse } from "@/api/entities/types";
import CompareForm from "@/components/entities/CompareForm";
import EntityDetail from "@/components/entities/EntityDetail";
import FieldDetail from "@/components/entities/FieldDetail";
import EntitiesDiffGraph from "@/components/entities/graphs/EntitiesDiffGraph";
import Navbar from "@/components/entities/Navbar";
import RenderGraph from "@/components/entities/RenderGraph";
import { RenderType } from "@/components/entities/types";
import Overlay from "@/components/ui/Overlay";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useEntities } from "@/hooks/useEntity";
import React, { useState, useCallback } from "react";
import { useParams } from "react-router-dom";

const EntitiesPage = () => {
  React.useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  const { id } = useParams();
  if (!id) return <p>Error... Incorrect ID</p>;

  const [selectedNode, setSelectedNode] = useState<EntityNode | null>(null);
  const [selectedField, setSelectedField] = useState<EntityField | null>(null);
  const [selectedRenderType, setSelectedRenderType] = useState<RenderType>(
    RenderType.BASIC_GRAPH
  );
  const [selectedEntitiesDiff, setSelectedEntitiesDiff] = useState<
    string | null
  >(null);
  const [compareUp, setCompareUp] = useState<boolean>(false);
  const [showComparisons, setShowComparisons] = useState<boolean>(false);
  const [showIsolatedNodes, setShowIsolatedNodes] = useState<boolean>(false);

  const { data: entities, isLoading, error } = useEntities(id);

  const { toast } = useToast();

  const handleNodeClick = useCallback(
    (node: EntityNode): void => {
      if (node === selectedNode) {
        setSelectedNode(null);
        setSelectedField(null);
      } else {
        setSelectedNode(node);
      }
    },
    [selectedNode]
  );

  const handleFieldClick = useCallback((field: EntityField) => {
    setSelectedField((prev) => (prev === field ? null : field));
  }, []);

  const handleCompareResponse = (resp: CompareEntitiesLinksResponse) => {
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

  const renderContent = () => {
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: Unable to fetch entity data.</p>;
    if (showComparisons && entities) {
      return (
        <EntitiesDiffGraph
          graphData={{
            nodes: entities.nodes,
            links: [],
          }}
          onNodeClick={handleNodeClick}
          entitiesDiffId={selectedEntitiesDiff}
        />
      );
    }
    return (
      <RenderGraph
        onNodeClick={handleNodeClick}
        entities={entities}
        renderType={selectedRenderType}
        showIsolatedNodes={showIsolatedNodes}
      />
    );
  };

  return (
    <div className="h-screen w-screen">
      <Navbar
        setSelectedRenderType={setSelectedRenderType}
        compareBtnClick={() => setCompareUp(true)}
        isolatedNodesBtnClick={() => setShowIsolatedNodes(!showIsolatedNodes)}
        analysisInputId={id}
        setShowComparisons={setShowComparisons}
        showComparisons={showComparisons}
        setSelectedEntitiesDiff={setSelectedEntitiesDiff}
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
          aria-label="Compare Entities"
        >
          <CompareForm analysisInputId={id} respFunc={handleCompareResponse} />
        </Overlay>
      )}
    </div>
  );
};

export default EntitiesPage;
