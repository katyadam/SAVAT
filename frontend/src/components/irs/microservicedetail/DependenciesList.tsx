import { getMsDependencies, getMsEdges } from "@/api/irs/graphFunctions";
import { IREdge, Microservice } from "@/api/irs/types";
import { FC, useState } from "react";
import DependencyDetail from "./DependencyDetail";

type DependenciesListType = {
  ms: Microservice;
  irEdges: IREdge[];
};

const DependenciesList: FC<DependenciesListType> = ({ ms, irEdges }) => {
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
        {getMsDependencies(ms, irEdges).map((dep, i) => (
          <DependencyDetail
            key={i}
            dependencyMsName={dep}
            openOrClose={() => handleOpenClose(dep)}
          />
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <p>{selectedDep}</p>
        <div>
          {getMsEdges(irEdges, ms.name)
            .find((edge) => edge.targetMs === selectedDep)
            ?.connections.map((conn, i) => (
              <p key={i}>
                {conn.endpoint.name} {conn.endpoint.url}
              </p>
            ))}
        </div>
      </div>
    </div>
  );
};

export default DependenciesList;
