import { EntityNode, EntityField } from "@/api/entities/types";
import { CompareEntitiesLinksResponse } from "@/api/outputs/types";
import CompareForm from "@/components/entities/CompareForm";
import EntityDetail from "@/components/entities/EntityDetail";
import FieldDetail from "@/components/entities/FieldDetail";
import Navbar from "@/components/entities/Navbar";
import RenderCompareGraph from "@/components/entities/RenderCompareGraph";
import RenderGraph from "@/components/entities/RenderGraph";
import { RenderType } from "@/components/entities/types";
import Overlay from "@/components/ui/Overlay";
import { Separator } from "@/components/ui/separator";
import { useEntities } from "@/hooks/useEntity";
import React, { useState } from "react";
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
  const [compareUp, setCompareUp] = useState<boolean>(false);
  const [compareResponse, setCompareResponse] =
    useState<CompareEntitiesLinksResponse | null>(null);
  const handleNodeClick = (node: EntityNode): void => {
    if (node === selectedNode) {
      setSelectedNode(null);
      setSelectedField(null);
    } else {
      setSelectedNode(node);
    }
  };

  const handleFieldClick = (field: EntityField) => {
    if (selectedField === field) {
      setSelectedField(null);
    } else {
      setSelectedField(field);
    }
  };

  const handleCompareResponse = (resp: CompareEntitiesLinksResponse) => {
    setCompareResponse(resp);
    setCompareUp(false);
  };

  const { data: entities, isLoading } = useEntities(id);
  console.log(entities);
  if (isLoading) return <p>Loading...</p>;
  const closeOverlay = () => {
    setSelectedNode(null);
    setSelectedField(null);
  };

  return (
    <div>
      <Navbar
        setSelectedRenderType={setSelectedRenderType}
        compareBtnClick={() => setCompareUp(true)}
      />
      <Separator className="mt-2" />
      {/* Rendered graph */}
      <RenderGraph
        onNodeClick={handleNodeClick}
        entities={entities}
        renderType={selectedRenderType}
      />
      {/* Displayed views based on state of the webpage */}
      {selectedNode && (
        <Overlay width="5/6" closeFunc={closeOverlay}>
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
        <Overlay width="5/6" closeFunc={() => setCompareUp(false)}>
          <CompareForm analysisInputId={id} respFunc={handleCompareResponse} />
        </Overlay>
      )}
      {compareResponse && entities && (
        <Overlay width="5/6" closeFunc={() => setCompareResponse(null)}>
          <div>
            <RenderCompareGraph
              entities={{
                nodes: entities.nodes,
                links: compareResponse.changedLinks,
              }}
            />
          </div>
        </Overlay>
      )}
    </div>
  );
};

export default EntitiesPage;
