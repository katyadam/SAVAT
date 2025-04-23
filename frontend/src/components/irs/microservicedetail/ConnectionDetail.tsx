import { Connection } from "@/api/irs/types";
import { FC } from "react";
import ConnectionDetailAttribute from "./ConnectionDetailAttribute";

type ConnectionDetailType = {
  connection: Connection;
};

const ConnectionDetail: FC<ConnectionDetailType> = ({ connection }) => {
  return (
    <div className="border-2 p-4 rounded-md">
      {Object.entries(connection.endpoint).map(([key, value]) =>
        typeof value === "string" || typeof value === "number" ? (
          <ConnectionDetailAttribute key={key} title={key} value={value} />
        ) : null
      )}
    </div>
  );
};

export default ConnectionDetail;
