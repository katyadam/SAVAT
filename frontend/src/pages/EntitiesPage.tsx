import { GraphNode } from "@/api/entities";
import EntityDetail from "@/components/entities/EntityDetail";
import RenderGraph from "@/components/entities/RenderGraph";
import Overlay from "@/components/ui/Overlay";
import React, { useState } from "react";

const EntitiesPage = () => {
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const handleNodeClick = (node: GraphNode): void => {
    if (node === selectedNode) {
      setSelectedNode(null);
    } else {
      setSelectedNode(node);
    }
  };

  const closeOverlay = () => setSelectedNode(null);

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
          <EntityDetail entity={selectedNode} />
        </Overlay>
      )}
    </div>
  );
};

export default EntitiesPage;
