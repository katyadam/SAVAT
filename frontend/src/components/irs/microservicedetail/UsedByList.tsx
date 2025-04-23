import { IREdge, Microservice } from "@/api/irs/types";
import { FC, useState } from "react";
import { getMsEdges, getMsUsedBy } from "@/api/irs/graphFunctions";
import ListingButton from "./ListingButton";
import ConnectionDetail from "./ConnectionDetail";

type UsedByListType = {
  ms: Microservice;
  irEdges: IREdge[];
};

const UsedByList: FC<UsedByListType> = ({ ms, irEdges }) => {
  const [selectedDep, setSelectedDep] = useState<string | null>(null);

  const handleOpenClose = (dep: string) => {
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
        {getMsUsedBy(ms, irEdges).map((dep, i) => (
          <ListingButton
            key={i}
            openOrClose={() => handleOpenClose(dep)}
            msName={dep}
          />
        ))}
      </div>
      {selectedDep && (
        <div className="flex flex-col gap-2">
          <p>{selectedDep}</p>
          <div className="flex flex-col gap-2">
            {getMsEdges(irEdges, selectedDep)
              .find((edge) => edge.targetMs === ms.name)
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
