import Graph from "@/components/irs/Graph";
import Navbar from "@/components/irs/Navbar";
import Loading from "@/components/loading/Loading";
import Overlay from "@/components/ui/Overlay";
import { Separator } from "@/components/ui/separator";
import { useSelectedIRFile } from "@/context/SelectedIRFileContext";
import { useIRFileContent } from "@/hooks/useIR";
import { useEffect, useState } from "react";

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

  const [clickedNode, setClickedNode] = useState<string | null>(null);

  const renderContent = () => {
    if (isLoading) return <Loading />;
    if (error) return <p>This IR file doesn't exist!</p>;
    if (ir) {
      return <Graph ir={ir} setClickedNode={setClickedNode} />;
    }
  };
  return (
    <>
      <div className="h-screen w-screen">
        <Navbar />
        <Separator className="mt-2" />
        {renderContent()}
        {clickedNode && (
          <Overlay closeFunc={() => setClickedNode(null)} width="1/2">
            <h1>{clickedNode}</h1>
          </Overlay>
        )}
      </div>
    </>
  );
};

export default IRPage;
