import { FC, useState } from "react";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { useCompareEntitiesLinks } from "@/hooks/useAnalysisOutput";
import { Button } from "../ui/button";
import { EntityLink } from "@/api/entities/types";
import { CompareEntitiesLinksResponse } from "@/api/outputs/types";

type CompareFormType = {
  analysisInputId: string;
  respFunc: (resp: CompareEntitiesLinksResponse) => void;
};

const CompareForm: FC<CompareFormType> = ({ analysisInputId, respFunc }) => {
  const { mutateAsync } = useCompareEntitiesLinks(analysisInputId);
  const [jsonInput, setJsonInput] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonInput(event.target.value);
  };

  const handleCompare = async () => {
    try {
      const parsedData: EntityLink[] = JSON.parse(jsonInput);

      if (!Array.isArray(parsedData)) {
        throw new Error("Invalid JSON format. Expected an array.");
      }

      const res = await mutateAsync(parsedData);

      respFunc(res);
      console.log("Successfuly fetched: " + res);
    } catch (error) {
      console.error("Failed to parse JSON input:", error);
      alert("Invalid JSON input. Please ensure it is correctly formatted.");
    }
  };

  const exampleJson = `[
    {
        "source": "Assurance",
        "target": "Order",
        "msSource": "ts-common",
        "msTarget": "ts-order",
        "sourceMultiplicity": "0..*",
        "targetMultiplicity": "0"
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
        Compare Entity Links
      </Button>
    </div>
  );
};

export default CompareForm;
