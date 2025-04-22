import { FC } from "react";

type UsedByListType = {
  usedBy: string[];
};

const UsedByList: FC<UsedByListType> = ({ usedBy }) => {
  return (
    <div>
      {usedBy.map((dep, i) => (
        <p key={i}>{dep}</p>
      ))}
    </div>
  );
};

export default UsedByList;
