import { MicroserviceNode } from "@/api/projects/analysisInputs";
import { FC } from "react";
import { CompareFormTable } from "./CompareFormTable";
import { columns } from "./Columns";
import { ArrowLeftRight } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

type CompareFormProps = {
  microservices: MicroserviceNode[];
};

const CompareForm: FC<CompareFormProps> = ({ microservices }) => {
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
    <div className="flex flex-row items-center gap-4">
      <CompareFormTable columns={columns} data={microservicesWithSizes} />
      <div className="flex flex-col items-center gap-2">
        <ArrowLeftRight />
        <Button variant="ghost">Compare</Button>
      </div>
      <div className="grid w-full gap-1.5">
        <Label htmlFor="jsonMethods">JSON to compare with</Label>
        <Textarea placeholder={exampleJson} id="jsonMethods" rows={11} />
      </div>
    </div>
  );
};

export default CompareForm;
