import { IREdge, Microservice } from "@/api/irs/types";
import { FC } from "react";
import UsedByDetail from "./UsedByDetail";
import { getMsEdges, getMsUsedBy } from "@/api/irs/graphFunctions";

type UsedByListType = {
  ms: Microservice;
  irEdges: IREdge[];
};

const UsedByList: FC<UsedByListType> = ({ ms, irEdges }) => {
  return (
    <div>
      {getMsUsedBy(ms, irEdges).map((dep, i) => (
        <UsedByDetail
          key={i}
          usedByMsName={dep}
          connections={
            getMsEdges(irEdges, dep).find((edge) => edge.targetMs === ms.name)
              ?.connections
          }
        />
      ))}
    </div>
  );
};

export default UsedByList;
