import { IREdge, Microservice } from "@/api/irs/types";
import { FC, useState } from "react";
import { getMsEdges, getMsUsedBy } from "@/api/irs/graphFunctions";
import ListingButton from "./ListingButton";
import ConnectionDetail from "./ConnectionDetail";
import IRApi from "@/api/irs/api";

type UsedByListType = {
  ms: Microservice;
  microservices: Microservice[];
  irEdges: IREdge[];
};

const UsedByList: FC<UsedByListType> = ({ ms, microservices, irEdges }) => {
  const [selectedDep, setSelectedDep] = useState<Microservice | null>(null);

  const handleOpenClose = (dep: Microservice) => {
    if (!selectedDep) {
      setSelectedDep(dep);
    } else if (selectedDep === dep) {
      setSelectedDep(null);
    } else {
      setSelectedDep(dep);
    }
  };
  return (
    <div className="flex flex-row gap-4">
      <div className="flex flex-col gap-4 my-2 mx-6">
        {getMsUsedBy(ms, microservices, irEdges).map((dep, i) => (
          <ListingButton
            key={i}
            openOrClose={() => handleOpenClose(dep)}
            msName={dep.name}
          />
        ))}
      </div>
      {selectedDep && (
        <div className="flex flex-col gap-2">
          <p>{selectedDep.name}</p>
          <div className="flex flex-col gap-2">
            {getMsEdges(irEdges, selectedDep)
              .find((edge) => edge.targetMsId === IRApi.getMsId(ms))
              ?.connections.map((conn, i) => (
                <ConnectionDetail key={i} connection={conn} />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UsedByList;
