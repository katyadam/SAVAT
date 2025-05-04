import IRApi from "@/api/irs/api";
import { createIREdges } from "@/api/irs/graphFunctions";
import { IREdge } from "@/api/irs/types";
import Graph from "@/components/irs/graphs/Graph";
import MicroserviceDetailPanel from "@/components/irs/microservicedetail/MicroserviceDetailPanel";
import Navbar from "@/components/irs/Navbar";
import ExplorePanel from "@/components/irs/reachability/ExplorePanel";
import Loading from "@/components/loading/Loading";
import Overlay from "@/components/ui/Overlay";
import { Separator } from "@/components/ui/separator";
import { useIRMsReach } from "@/context/ir/IRMsReachContext";
import { useSelectedIRFile } from "@/context/ir/SelectedIRFileContext";
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

  const { irMsReachState, irMsReachDispatch } = useIRMsReach();

  const irEdges: IREdge[] = useMemo(() => {
    if (ir?.microservices) {
      return createIREdges(ir.microservices);
    }
    return [];
  }, [ir]);

  const [clickedNode, setClickedNode] = useState<string | null>(null);
  const [highlightCycles, setHighlightCycles] = useState<boolean>(false);
  const [couplingThreshold, setCouplingThreshold] = useState<number>(0);

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
          couplingThreshold={couplingThreshold}
        />
      );
    }
  };
  return ir ? (
    <div className="h-screen w-screen">
      <Navbar
        highlightCycles={highlightCycles}
        setHighlightCycles={setHighlightCycles}
        couplingThreshold={couplingThreshold}
        setCouplingThreshold={setCouplingThreshold}
        microservices={ir?.microservices}
      />
      <Separator className="mt-2" />
      {renderContent()}
      {clickedNode && (
        <Overlay closeFunc={() => setClickedNode(null)} width="1/2">
          <MicroserviceDetailPanel
            ms={ir?.microservices.find(
              (ms) => IRApi.getMsId(ms) === clickedNode
            )}
            graph={{ nodes: ir.microservices, edges: irEdges }}
          />
        </Overlay>
      )}
      {ir &&
        irEdges &&
        irMsReachState.msId &&
        irMsReachState.reachValue &&
        irMsReachState.reachValue > 0 && (
          <Overlay
            closeFunc={() => irMsReachDispatch({ type: "REMOVE_MS_REACH" })}
            width={"5/6"}
          >
            <ExplorePanel graph={{ nodes: ir.microservices, edges: irEdges }} />
          </Overlay>
        )}
    </div>
  ) : (
    <Loading />
  );
};

export default IRPage;
