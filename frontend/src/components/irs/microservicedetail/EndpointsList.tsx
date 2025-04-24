import { Endpoint } from "@/api/irs/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FC } from "react";
import ConnectionDetailAttribute from "./ConnectionDetailAttribute";

type EndpointsListType = {
  endpoints: Endpoint[];
};

const EndpointsList: FC<EndpointsListType> = ({ endpoints }) => {
  return (
    <div>
      {endpoints.map((endpoint, i) => (
        <Accordion type="single" collapsible key={i}>
          <AccordionItem value={`${endpoint.url}`}>
            <AccordionTrigger className="font-bold">
              {endpoint.url}
            </AccordionTrigger>
            <AccordionContent>
              {Object.entries(endpoint).map(([key, value]) =>
                typeof value === "string" || typeof value === "number" ? (
                  <ConnectionDetailAttribute
                    key={key}
                    title={key}
                    value={value}
                  />
                ) : null
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
};

export default EndpointsList;
