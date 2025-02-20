import Loading from "@/components/loading/Loading";
import MethodsPanel from "@/components/methods/MethodsPanel";
import { useCallGraphInput } from "@/hooks/useCallGraph";
import { useParams } from "react-router-dom";

const MethodsPage = () => {
  const { id } = useParams();

  const { data: callGraphInput, isLoading } = useCallGraphInput(id || "");
  if (isLoading) return <Loading overlay={false} />;
  // TODO: use only ID, call useCallGraphInput(id) in MethodsTable
  return (
    <>
      {callGraphInput && !isLoading && id && (
        <MethodsPanel
          methods={callGraphInput.callGraph.methods}
          callGraphInputId={id}
        />
      )}
    </>
  );
};

export default MethodsPage;
