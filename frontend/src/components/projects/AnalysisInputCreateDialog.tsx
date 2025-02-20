import { FC } from "react";
import { Label } from "../ui/label";
import { Upload } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useAnalysisInputCreate } from "@/hooks/useProject";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { CreateAnalysisInput } from "@/api/inputs/types";
import { exampleCommGraph, exampleEntities } from "./JsonExamples";
import { Separator } from "../ui/separator";
import { GraphData } from "@/api/entities/types";
import { CommGraph } from "@/api/communication-graphs/types";

type AnalysisInputImportDialogType = {
  projectId: string;
  closeDialog: () => void;
};

type AnalysisInputWithoutParsing = Omit<
  CreateAnalysisInput,
  "projectId" | "entities" | "graph"
> & {
  entities: string;
  graph: string;
};

const AnalysisInputCreateDialog: FC<AnalysisInputImportDialogType> = ({
  projectId,
  closeDialog,
}) => {
  const { register, handleSubmit, setError } =
    useForm<AnalysisInputWithoutParsing>();

  const { mutateAsync } = useAnalysisInputCreate(projectId);
  const { toast } = useToast();

  const onSubmit = async (data: AnalysisInputWithoutParsing) => {
    try {
      const parsedEntities: GraphData = JSON.parse(data.entities);
      const parsedCommGraph: CommGraph = JSON.parse(data.graph);
      if (parsedEntities.nodes.length == 0) {
        toast({
          title: "Zero entities provided!",
          description: "Specify atleast 1 entity!",
        });
      } else if (parsedCommGraph.nodes.length == 0) {
        toast({
          title: "Zero nodes provided!",
          description: "Specify atleast 1 node!",
        });
      } else {
        await mutateAsync({
          projectId: projectId,
          version: data.version,
          commitHash: data.commitHash,
          entities: parsedEntities,
          graph: parsedCommGraph,
        });
        closeDialog();
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError("root", { type: "manual", message: "Invalid JSON format" });
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
      <Separator />
      <div className="flex flex-row justify-between gap-5 items-center">
        <div className="w-full text-left">
          <Label htmlFor="jsonCallgraph">Communication Graph</Label>
          <Textarea
            className="min-h-64"
            placeholder={exampleCommGraph}
            id="jsonCallgraph"
            rows={20}
            {...register("graph")}
          />
        </div>
        <div className="w-full text-left">
          <Label htmlFor="jsonCallgraph">Entities</Label>
          <Textarea
            className="min-h-64"
            placeholder={exampleEntities}
            id="jsonCallgraph"
            rows={20}
            {...register("entities")}
          />
        </div>
      </div>
      <Button type="submit" className="w-1/6">
        <Upload />
      </Button>
    </form>
  );
};

export default AnalysisInputCreateDialog;
