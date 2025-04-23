import { Connection } from "@/api/irs/types";
import { FC } from "react";

type UsedByDetailType = {
  usedByMsName: string;
  connections?: Connection[];
};

const UsedByDetail: FC<UsedByDetailType> = ({ usedByMsName, connections }) => {
  return (
    <div className="flex flex-row gap-2">
      <p>{usedByMsName}</p>
      <div>
        {connections?.map((conn, i) => (
          <p key={i}>
            {conn.endpoint.name} {conn.endpoint.url}
          </p>
        ))}
      </div>
    </div>
  );
};

export default UsedByDetail;
