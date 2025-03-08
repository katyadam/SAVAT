import { FC, useState } from "react";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { useCompareCommGraphLinks } from "@/hooks/useCompare";
import { Button } from "../ui/button";
import {
  CommGraphLink,
  CompareCommGraphLinksResponse,
} from "@/api/communication-graphs/types";

type CompareFormType = {
  analysisInputId: string;
  respFunc: (resp: CompareCommGraphLinksResponse) => void;
};

const CompareForm: FC<CompareFormType> = ({ analysisInputId, respFunc }) => {
  const { mutateAsync } = useCompareCommGraphLinks(analysisInputId);
  const [jsonInput, setJsonInput] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonInput(event.target.value);
  };

  const handleCompare = async () => {
    try {
      const parsedData: CommGraphLink[] = JSON.parse(jsonInput);

      if (!Array.isArray(parsedData)) {
        throw new Error("Invalid JSON format. Expected an array.");
      }

      const res = await mutateAsync(parsedData);

      respFunc(res);
    } catch (error) {
      console.error("Failed to parse JSON input:", error);
      alert("Invalid JSON input. Please ensure it is correctly formatted.");
    }
  };

  const exampleJson = `[
    {
      "source": "A",
      "target": "B",
      "requests": [
        {
          "type": "POST",
          "uri": "annything/api/v1/orderservice/order/tickets",
          "endpointMsName": "ts-order-service",
          "targetEndpointUri": "/api/v1/orderservice/order/tickets"
        },
        {
          "type": "POST",
          "uri": "annything/a/THIS_ONLY_IN_A",
          "endpointMsName": "ts-order-service",
          "targetEndpointUri": "/api/v1/orderservice/order/tickets"
        }
      ]
    },
    Other links...
]`;

  return (
    <div className="flex flex-col gap-4">
      <div className="grid w-full h-full gap-1.5">
        <Label htmlFor="jsonMethods">JSON to compare with</Label>
        <Textarea
          className="min-h-64 min-w-64"
          placeholder={exampleJson}
          id="jsonMethods"
          rows={13}
          value={jsonInput}
          onChange={handleInputChange}
        />
      </div>
      <Button onClick={handleCompare} variant="outline">
        Compare Communication Graph Links
      </Button>
    </div>
  );
};

export default CompareForm;
