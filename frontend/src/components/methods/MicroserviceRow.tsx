import { ArrowRight } from "lucide-react";
import { FC } from "react";
import { Button } from "../ui/button";
import { MicroserviceNode } from "@/api/methods/types";

type MicroserviceRowProps = {
  ms: MicroserviceNode;
  onClick: (ms: MicroserviceNode) => void;
};

const MicroserviceRow: FC<MicroserviceRowProps> = ({ ms, onClick }) => {
  return (
    <Button variant="outline" onClick={() => onClick(ms)}>
      <p>{ms.name}</p>
      <ArrowRight />
    </Button>
  );
};

export default MicroserviceRow;
