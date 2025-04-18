import Loading from "@/components/loading/Loading";
import { useIRFileContent } from "@/hooks/useIR";
import { useParams } from "react-router-dom";

const IRPage = () => {
  const { irFile } = useParams();
  const { data: ir, isLoading, error } = useIRFileContent(irFile || "");
  if (error) return <p>This IR file doesn't exist!</p>;
  if (!irFile || isLoading) return <Loading />;
  return <div>{ir && ir.name}</div>;
};

export default IRPage;
