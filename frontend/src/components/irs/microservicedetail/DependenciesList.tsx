import { getMsDependencies, getMsEdges } from "@/api/irs/graphFunctions";
import { IREdge, Microservice } from "@/api/irs/types";
import { FC, useState } from "react";
import ListingButton from "./ListingButton";
import ConnectionDetail from "./ConnectionDetail";
import IRApi from "@/api/irs/api";

type DependenciesListType = {
  ms: Microservice;
  microservices: Microservice[];
  irEdges: IREdge[];
};

const DependenciesList: FC<DependenciesListType> = ({
  ms,
  microservices,
  irEdges,
}) => {
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
        {getMsDependencies(ms, microservices, irEdges).map((dep, i) => (
          <ListingButton
            key={i}
            msName={dep.name}
            openOrClose={() => handleOpenClose(dep)}
          />
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <p>{selectedDep?.name}</p>
        <div className="flex flex-col gap-2">
          {selectedDep &&
            getMsEdges(irEdges, ms)
              .find((edge) => edge.targetMsId === IRApi.getMsId(selectedDep))
              ?.connections.map((conn, i) => (
                <ConnectionDetail key={i} connection={conn} />
              ))}
        </div>
      </div>
    </div>
  );
};

export default DependenciesList;
