import { Endpoint } from "@/api/irs/types";
import { FC } from "react";

type EndpointsListType = {
  endpoints: Endpoint[];
};

const EndpointsList: FC<EndpointsListType> = ({ endpoints }) => {
  return (
    <div>
      {endpoints.map((endpoint, i) => (
        <p key={i}>{endpoint.URI}</p>
      ))}
    </div>
  );
};

export default EndpointsList;
