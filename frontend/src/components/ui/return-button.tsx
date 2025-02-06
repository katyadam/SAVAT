import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ReturnButton = () => {
  const navigate = useNavigate();
  return (
    <ArrowLeft
      onClick={() => navigate(-1)}
      className="cursor-pointer hover:bg-slate-100 m-1"
    />
  );
};

export default ReturnButton;
