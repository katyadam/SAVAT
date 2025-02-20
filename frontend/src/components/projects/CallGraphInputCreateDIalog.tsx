import { FC } from "react";
import { useForm } from "react-hook-form";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Upload } from "lucide-react";
import { Button } from "../ui/button";
import { useCallGraphInputCreate } from "@/hooks/useProject";
import { CallGraph, CreateCallGraphInput } from "@/api/callgraphs/types";
import { useToast } from "@/hooks/use-toast";
import { exampleCallGraph } from "./JsonExamples";

type ProjectsImportDialogType = {
  projectId: string;
  closeDialog: () => void;
};

type CallGraphInputWithParsing = Omit<
  CreateCallGraphInput,
  "projectId" | "callGraph"
> & {
  callGraph: string;
};
const CallGraphInputCreateDialog: FC<ProjectsImportDialogType> = ({
  projectId,
  closeDialog,
}) => {
  const { register, handleSubmit, setError } =
    useForm<CallGraphInputWithParsing>();
  const { mutateAsync } = useCallGraphInputCreate(projectId);
  const { toast } = useToast();

  const onSubmit = async (data: CallGraphInputWithParsing) => {
    try {
      const parsedCallGraph: CallGraph = JSON.parse(data.callGraph);
      if (parsedCallGraph.methods.length == 0) {
        toast({
          title: "Empty call graph!",
          description: "Every call graph has atleast 1 method!",
        });
      } else {
        await mutateAsync({
          projectId: parseInt(projectId),
          version: data.version,
          commitHash: data.commitHash,
          callGraph: parsedCallGraph,
        });
        closeDialog();
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError("callGraph", {
          type: "manual",
          message: "Invalid JSON format",
        });
        toast({
          title: "Error occured, unable to import your input!",
          description: "Try again",
          variant: "destructive",
        });
      }
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
        <Label htmlFor="jsonCallgraph">Callgraph</Label>
        <Textarea
          className="min-h-64"
          placeholder={exampleCallGraph}
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

export default CallGraphInputCreateDialog;
