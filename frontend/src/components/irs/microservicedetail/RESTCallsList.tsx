import { RESTCall } from "@/api/irs/types";
import { FC } from "react";

type RESTCallsListType = {
  restCalls: RESTCall[];
};

const RESTCallsList: FC<RESTCallsListType> = ({ restCalls }) => {
  return (
    <div>
      {restCalls.map((restCall, i) => (
        <p key={i}>{restCall.url}</p>
      ))}
    </div>
  );
};

export default RESTCallsList;
