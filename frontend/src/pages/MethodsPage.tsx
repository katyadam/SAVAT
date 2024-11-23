import MethodsPanel from "@/components/methods/MethodsPanel";
import { useMethods } from "@/hooks/useMethod";
import { useParams } from "react-router-dom";

const MethodsPage = () => {
  const { id } = useParams();
  if (!id) return <p>Error... Incorrect ID</p>;

  const { data: microservices, isLoading } = useMethods(id);

  return (
    <>
      {microservices && !isLoading && (
        <MethodsPanel analysisInputId={id} microservices={microservices} />
      )}
    </>
  );
};

export default MethodsPage;
