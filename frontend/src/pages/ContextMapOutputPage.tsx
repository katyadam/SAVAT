import { Field, Node } from "@/api/context-maps/types";
import EntityDetail from "@/components/context-maps/EntityDetail";
import FieldDetail from "@/components/context-maps/FieldDetail";
import { getMicroservicesColors } from "@/components/context-maps/generators/colorGenerator";
import Navbar from "@/components/context-maps/Navbar";
import RenderGraph from "@/components/context-maps/RenderGraph";
import { RenderType } from "@/components/context-maps/types";
import Loading from "@/components/loading/Loading";
import { ContextMapOutputHint } from "@/components/ui/hints";
import Overlay from "@/components/ui/Overlay";
import { Separator } from "@/components/ui/separator";
import { useContextMapOutput } from "@/hooks/useContextMapOutput";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ContextMapOutputPage = () => {
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);
  const { id } = useParams();
  const {
    data: contextMapOutput,
    isLoading,
    error,
  } = useContextMapOutput(id || "");

  const [msColors, setMsColors] = useState<Map<string, string>>(new Map());

  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [selectedField, setSelectedField] = useState<Field | null>(null);

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

  const [selectedRenderType, setSelectedRenderType] = useState<RenderType>(
    RenderType.BASIC_GRAPH
  );

  const [showIsolatedNodes, setShowIsolatedNodes] = useState<boolean>(true);

  const closeOverlay = () => {
    setSelectedNode(null);
    setSelectedField(null);
  };

  useEffect(() => {
    if (contextMapOutput && contextMapOutput.ciaContextMap) {
      setMsColors(getMicroservicesColors(contextMapOutput.ciaContextMap.nodes));
    }
  }, [contextMapOutput?.ciaContextMap]);

  const renderContent = () => {
    if (error || !id) return <p>Error: Unable to fetch context map outputs.</p>;
    if (
      contextMapOutput &&
      contextMapOutput.ciaContextMap &&
      msColors &&
      !isLoading
    ) {
      return (
        <RenderGraph
          onNodeClick={handleNodeClick}
          contextMap={contextMapOutput.ciaContextMap}
          renderType={selectedRenderType}
          showIsolatedNodes={showIsolatedNodes}
          msColors={msColors}
        />
      );
    }
    return <Loading />;
  };

  return id ? (
    <div className="h-screen w-screen">
      <Navbar
        setSelectedRenderType={setSelectedRenderType}
        isolatedNodesBtnClick={() => setShowIsolatedNodes(!showIsolatedNodes)}
        contextMapId={id}
        msColors={msColors}
        hintComponent={<ContextMapOutputHint />}
        showIsolatedNodes={true}
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
    </div>
  ) : (
    <Loading />
  );
};

export default ContextMapOutputPage;
