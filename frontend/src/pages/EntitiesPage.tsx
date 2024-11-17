import { Field, GraphNode } from "@/api/entities";
import EntityDetail from "@/components/entities/EntityDetail";
import FieldDetail from "@/components/entities/FieldDetail";
import RenderGraph from "@/components/entities/RenderGraph";
import Overlay from "@/components/ui/Overlay";
import React, { useState } from "react";

const EntitiesPage = () => {
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const handleNodeClick = (node: GraphNode): void => {
    if (node === selectedNode) {
      setSelectedNode(null);
      setSelectedField(null);
    } else {
      setSelectedNode(node);
    }
  };

  const [selectedField, setSelectedField] = useState<Field | null>(null);

  const handleFieldClick = (field: Field) => {
    if (selectedField === field) {
      setSelectedField(null);
    } else {
      setSelectedField(field);
    }
  };

  const closeOverlay = () => {
    setSelectedNode(null);
    setSelectedField(null);
  };

  React.useEffect(() => {
    document.body.classList.add("overflow-hidden");

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  return (
    <div>
      <RenderGraph onNodeClick={handleNodeClick} />
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
