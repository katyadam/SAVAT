import { MicroserviceNode } from "@/api/analysisInputs";
import { FC, useState } from "react";
import { CompareFormTable } from "./CompareFormTable";
import { columns } from "./Columns";
import { ArrowLeftRight, ArrowUpDown } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useCompareMethods } from "@/hooks/useAnalysisOutput";
import { useMediaQuery } from "react-responsive";

type CompareFormProps = {
  analysisInputId: string;
  microservices: MicroserviceNode[];
};

const CompareForm: FC<CompareFormProps> = ({
  analysisInputId,
  microservices,
}) => {
  const { mutateAsync } = useCompareMethods(analysisInputId);
  const [jsonInput, setJsonInput] = useState<string>("");
  const isMediumScreen = useMediaQuery({ query: "(min-width: 768px)" });

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonInput(event.target.value);
  };

  const handleCompare = async () => {
    try {
      const parsedData: MicroserviceNode[] = JSON.parse(jsonInput);

      if (!Array.isArray(parsedData)) {
        throw new Error("Invalid JSON format. Expected an array.");
      }

      const res = await mutateAsync(parsedData);
      console.log(res);
    } catch (error) {
      console.error("Failed to parse JSON input:", error);
      alert("Invalid JSON input. Please ensure it is correctly formatted.");
    }
  };

  const microservicesWithSizes = microservices.map((ms) => ({
    name: ms.name,
    methodsSize: ms.methods.length,
  }));
  const exampleJson = `[
    {
      "name": "order service",
      "methods": [
        {
          "name": "getOrder",
          "bytecodeHash": "magicalhash"
        }
      ]
    }
]`;

  return (
    <div className="flex flex-col md:flex-row items-center gap-4">
      <CompareFormTable columns={columns} data={microservicesWithSizes} />
      <div className="flex flex-col items-center gap-2">
        {isMediumScreen ? <ArrowLeftRight /> : <ArrowUpDown />}
        <Button variant="ghost" onClick={handleCompare}>
          Compare
        </Button>
      </div>
      <div className="grid w-full h-full gap-1.5">
        <Label htmlFor="jsonMethods">JSON to compare with</Label>
        <Textarea
          className="min-h-64"
          placeholder={exampleJson}
          id="jsonMethods"
          rows={13}
          value={jsonInput}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default CompareForm;
