import { Connection } from "@/api/irs/types";
import { FC } from "react";
import ConnectionDetailAttribute from "./ConnectionDetailAttribute";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type ConnectionDetailType = {
  connection: Connection;
};

const ConnectionDetail: FC<ConnectionDetailType> = ({ connection }) => {
  return (
    <div className="border-2 p-4 rounded-md">
      <Accordion
        type="single"
        collapsible
        key={`${connection.restCall.name}__${connection.endpoint.name}`}
      >
        <AccordionItem
          value={`${connection.restCall.name}__${connection.endpoint.name}`}
        >
          <AccordionTrigger className="flex flex-row gap-2 items-center">
            <p>
              <span className="font-bold">
                {connection.restCall.calledFrom}
              </span>{" "}
              calls{" "}
              <span className="font-bold">{connection.endpoint.name}</span>
            </p>
          </AccordionTrigger>
          <AccordionContent>
            {Object.entries(connection.endpoint).map(([key, value]) =>
              (typeof value === "string" || typeof value === "number") &&
              key !== "msId" ? (
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
    </div>
  );
};

export default ConnectionDetail;
