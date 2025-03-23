import { ChangedLink, Link, LinkRequest } from "@/api/sdgs/types";
import { ArrowRight } from "lucide-react";
import { FC, useState } from "react";
import { Button } from "../ui/button";
import RequestDetail from "./RequestDetail";
import RequestDetailField from "./RequestDetailField";
import {
  getRequestTypeColor,
  getRequestTypeHoverColor,
} from "@/api/sdgs/utils";

type LinkPanelType = {
  link: Link | ChangedLink;
};

const LinkPanel: FC<LinkPanelType> = ({ link }) => {
  const [selectedRequest, selectRequest] = useState<LinkRequest | null>(null);

  const handleSelectRequest = (request: LinkRequest | null) => {
    if (selectedRequest) {
      selectRequest(request == selectedRequest ? null : request);
    } else {
      selectRequest(request);
    }
  };

  return (
    <div className="flex flex-row gap-5">
      <div className="flex flex-col gap-5">
        <div className="flex flex-row justify-between items-center">
          <RequestDetailField
            label="Source Microservice"
            children={link.source}
          />
          <ArrowRight />
          <RequestDetailField
            label="Target Microservice"
            children={link.target}
          />
        </div>
        {"type" in link && link.type && <p>Type of change: {link.type}</p>}

        <div>
          <h1>Requests</h1>
          <div className="flex flex-col gap-2">
            {link.requests.map((request) => (
              <Button
                key={request.uri + request.type}
                onClick={() => handleSelectRequest(request)}
                variant="ghost"
                className={
                  `${selectedRequest == request && "border-2 border-black"} ` +
                  `${getRequestTypeColor(request.type)} ` +
                  `${getRequestTypeHoverColor(request.type)}`
                }
              >
                {request.uri}
              </Button>
            ))}
          </div>
        </div>
      </div>
      {selectedRequest && <RequestDetail request={selectedRequest} />}
    </div>
  );
};

export default LinkPanel;
