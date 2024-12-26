import { Eye } from "lucide-react";
import { FC } from "react";
import { Button } from "../ui/button";

type AnalysisInputButtonProps = {
  type: string;
  id: number;
};

const AnalysisInputButton: FC<AnalysisInputButtonProps> = ({ type, id }) => {
  return (
    <a href={`/${id}/${type}`}>
      <Button variant="outline">
        <Eye />
      </Button>
    </a>
  );
};

export default AnalysisInputButton;
