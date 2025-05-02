import { RESTCall } from "@/api/irs/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FC } from "react";
import ConnectionDetailAttribute from "./ConnectionDetailAttribute";

type RESTCallsListType = {
  restCalls: RESTCall[];
};

const RESTCallsList: FC<RESTCallsListType> = ({ restCalls }) => {
  return (
    <div className="flex flex-col gap-2">
      {restCalls.map((restCall, i) => (
        <Accordion type="single" collapsible key={i}>
          <AccordionItem value={`${restCall.name}`}>
            <AccordionTrigger className="font-bold">
              {restCall.calledFrom}
            </AccordionTrigger>
            <AccordionContent>
              {Object.entries(restCall).map(([key, value]) =>
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
      ))}
    </div>
  );
};

export default RESTCallsList;
