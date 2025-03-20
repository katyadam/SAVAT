import { LinkRequest } from "@/api/sdgs/types";
import { FC } from "react";
import RequestDetailField from "./RequestDetailField";

type RequestDetailType = {
  request: LinkRequest;
};

const RequestDetail: FC<RequestDetailType> = ({ request }) => {
  return (
    <div className="flex flex-col gap-5">
      <RequestDetailField label="Type" children={request.type} />
      <RequestDetailField label="URI" children={request.uri} />
      <RequestDetailField
        label="Endpoint's Microservice Name"
        children={request.endpointMsName}
      />
      <RequestDetailField
        label="Endpoint's Parent Method"
        children={request.endpointFunction}
      />
      <RequestDetailField
        label="Request's Microservice Name"
        children={request.msName}
      />
      <RequestDetailField
        label="Request's Parent Method"
        children={request.parentMethod}
      />
      <RequestDetailField
        label="Class Invoking REST Call"
        children={request.restCallInClassName}
      />
      <RequestDetailField
        label="Return Type"
        children={request.requestReturn}
      />
      <RequestDetailField
        label="Is Return Type Collection"
        children={request.isCollection ? "Yes" : "No"}
      />
    </div>
  );
};

export default RequestDetail;
