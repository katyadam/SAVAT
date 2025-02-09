import { FC } from "react";
import { useForm } from "react-hook-form";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Upload } from "lucide-react";
import { Button } from "../ui/button";
import { useCallGraphInputCreate } from "@/hooks/useProject";
import { CreateCallGraphInput } from "@/api/callgraphs/types";

type ProjectsImportDialogType = {
  projectId: string;
};

type CallGraphInputWithParsing = Omit<
  CreateCallGraphInput,
  "projectId" | "callGraph"
> & {
  callGraph: string;
};
const ProjectsImportDialog: FC<ProjectsImportDialogType> = ({ projectId }) => {
  const exampleJson = `{
    "methods": [
      {
        "id": 0,
        "name": "string",
        "type": "string",
        "parameters": [
          "string"
        ],
        "returnType": "string",
        "display": "string",
        "flags": "string",
        "bytecodeHash": "string",
        "microservice": "string",
        "endpointURI": "string",
        "httpMethod": "string",
        "endpointMethod": true,
        "entryPoint": true,
        "methodSignature": "string"
      }
    ],
    "calls": [
      {
        "source": "string",
        "target": "string",
        "isInterserviceCall": true,
        "httpMethod": "string"
      }
    ]
  }`;

  const { register, handleSubmit, setError } =
    useForm<CallGraphInputWithParsing>();
  const { mutateAsync } = useCallGraphInputCreate(projectId);

  const onSubmit = async (data: CallGraphInputWithParsing) => {
    try {
      const parsedCallGraph = JSON.parse(data.callGraph);
      await mutateAsync({
        projectId: parseInt(projectId),
        version: data.version,
        commitHash: data.commitHash,
        callGraph: parsedCallGraph,
      });
    } catch (error) {
      console.error("Error importing call graph:", error);
      setError("callGraph", { type: "manual", message: "Invalid JSON format" });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-between w-full h-full gap-4"
    >
      <div className="flex flex-row justify-between gap-4">
        <div className="w-full text-left">
          <Label htmlFor="version">Version</Label>
          <Input id="version" {...register("version")} />
        </div>
        <div className="w-full text-left">
          <Label htmlFor="commitHash">Commit Hash</Label>
          <Input id="commitHash" {...register("commitHash")} />
        </div>
      </div>

      <div className="w-full text-left">
        <Label htmlFor="jsonCallgraph">JSON Callgraph</Label>
        <Textarea
          className="min-h-64"
          placeholder={exampleJson}
          id="jsonCallgraph"
          rows={15}
          {...register("callGraph")}
        />
      </div>
      <Button type="submit" className="w-1/6">
        <Upload />
      </Button>
    </form>
  );
};

export default ProjectsImportDialog;
