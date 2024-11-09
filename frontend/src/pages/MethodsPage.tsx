import MethodsPanel from "@/components/methods/MethodsPanel";
import { useMethod } from "@/hooks/useMethod";
import { useParams } from "react-router-dom";

const MethodsPage = () => {
  const { id } = useParams();
  if (!id) return <p>Error... Incorrect ID</p>;

  const { data: microservices, isLoading } = useMethod(id);

  return (
    <div>
      {microservices && !isLoading && (
        <MethodsPanel microservices={microservices} />
      )}
    </div>
  );
};

export default MethodsPage;
