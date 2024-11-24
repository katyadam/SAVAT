import { EntityField, EntityNode } from "@/api/entities";
import EntityDetail from "@/components/entities/EntityDetail";
import FieldDetail from "@/components/entities/FieldDetail";
import RenderGraph from "@/components/entities/RenderGraph";
import Overlay from "@/components/ui/Overlay";
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
  const handleNodeClick = (node: EntityNode): void => {
    if (node === selectedNode) {
      setSelectedNode(null);
      setSelectedField(null);
    } else {
      setSelectedNode(node);
    }
  };

  const [selectedField, setSelectedField] = useState<EntityField | null>(null);

  const handleFieldClick = (field: EntityField) => {
    if (selectedField === field) {
      setSelectedField(null);
    } else {
      setSelectedField(field);
    }
  };

  const { data: entities, isLoading } = useEntities(id);
  if (isLoading) return <p>Loading...</p>;
  console.log(entities);
  const closeOverlay = () => {
    setSelectedNode(null);
    setSelectedField(null);
  };

  return (
    <div>
      <RenderGraph onNodeClick={handleNodeClick} entities={entities} />
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
    </div>
  );
};

export default EntitiesPage;
