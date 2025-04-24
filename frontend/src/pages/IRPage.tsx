import { createIREdges } from "@/api/irs/graphFunctions";
import { IREdge } from "@/api/irs/types";
import Graph from "@/components/irs/Graph";
import MicroserviceDetailPanel from "@/components/irs/microservicedetail/MicroserviceDetailPanel";
import Navbar from "@/components/irs/Navbar";
import Loading from "@/components/loading/Loading";
import Overlay from "@/components/ui/Overlay";
import { Separator } from "@/components/ui/separator";
import { useSelectedIRFile } from "@/context/SelectedIRFileContext";
import { useIRFileContent } from "@/hooks/useIR";
import { useEffect, useMemo, useState } from "react";

const IRPage = () => {
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);
  const { selectedIRFileState } = useSelectedIRFile();
  const {
    data: ir,
    isLoading,
    error,
  } = useIRFileContent(selectedIRFileState.selectedIRFile || "");

  const irEdges: IREdge[] = useMemo(() => {
    if (ir?.microservices) {
      return createIREdges(ir.microservices);
    }
    return [];
  }, [ir]);

  const [clickedNode, setClickedNode] = useState<string | null>(null);
  const [highlightCycles, setHighlightCycles] = useState<boolean>(false);

  const renderContent = () => {
    if (isLoading) return <Loading />;
    if (error) return <p>This IR file doesn't exist!</p>;
    if (ir) {
      return (
        <Graph
          ir={ir}
          irEdges={irEdges}
          setClickedNode={setClickedNode}
          highlightCycles={highlightCycles}
        />
      );
    }
  };
  return (
    <>
      <div className="h-screen w-screen">
        <Navbar
          highlightCycles={highlightCycles}
          setHighlightCycles={setHighlightCycles}
        />
        <Separator className="mt-2" />
        {renderContent()}
        {clickedNode && (
          <Overlay closeFunc={() => setClickedNode(null)} width="1/2">
            <MicroserviceDetailPanel
              ms={ir?.microservices.find((ms) => ms.name === clickedNode)}
              irEdges={irEdges}
            />
          </Overlay>
        )}
      </div>
    </>
  );
};

export default IRPage;
