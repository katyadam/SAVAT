import MethodsPanel from "@/components/methods/MethodsPanel";
import { useCallGraphInput } from "@/hooks/useCallGraph";
import { useParams } from "react-router-dom";

const MethodsPage = () => {
  const { id } = useParams();
  if (!id) return <p>Error... Incorrect ID</p>;

  const { data: callGraphInput, isLoading } = useCallGraphInput(id);

  return (
    <>
      {callGraphInput && !isLoading && (
        <MethodsPanel methods={callGraphInput.callGraph.methods} />
      )}
    </>
  );
};

export default MethodsPage;
