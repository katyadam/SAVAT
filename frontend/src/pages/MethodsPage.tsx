import MethodsPanel from "@/components/methods/MethodsPanel";
import { useCallGraphInput } from "@/hooks/useCallGraph";
import { useParams } from "react-router-dom";

const MethodsPage = () => {
  const { id } = useParams();
  if (!id) return <p>Error... Incorrect ID</p>;

  const { data: callGraphInput, isLoading } = useCallGraphInput(id);
  // TODO: use only ID, call useCallGraphInput(id) in MethodsTable
  return (
    <>
      {callGraphInput && !isLoading && (
        <MethodsPanel
          methods={callGraphInput.callGraph.methods}
          callGraphInputId={id}
        />
      )}
    </>
  );
};

export default MethodsPage;
