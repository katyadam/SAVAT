import { FC } from "react";

type DependenciesListType = {
  dependencies: string[];
};

const DependenciesList: FC<DependenciesListType> = ({ dependencies }) => {
  return (
    <div>
      {dependencies.map((dependency, i) => (
        <p key={i}>{dependency}</p>
      ))}
    </div>
  );
};

export default DependenciesList;
