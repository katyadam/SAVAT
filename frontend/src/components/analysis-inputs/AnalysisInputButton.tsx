import { Eye } from "lucide-react";
import { FC } from "react";
import { Button } from "../ui/button";

type AnalysisInputButtonProps = {
  text: string;
};

const AnalysisInputButton: FC<AnalysisInputButtonProps> = ({ text }) => {
  return (
    <Button variant="outline">
      <Eye />
    </Button>
  );
};

export default AnalysisInputButton;
