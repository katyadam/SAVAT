import { FC } from "react";
import { Label } from "../ui/label";
import { Upload } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { exampleContextMap } from "./JsonExamples";
import { Separator } from "../ui/separator";
import { useContextMapCreate } from "@/hooks/useContextMap";
import { ContextMap, CreateContextMapRequest } from "@/api/context-maps/types";

type ContextMapCreateDialogType = {
  projectId: string;
  closeDialog: () => void;
};

type ContextMapWithoutParsing = Omit<
  CreateContextMapRequest,
  "projectId" | "contextMap"
> & {
  contextMap: string;
};

const ContextMapCreateDialog: FC<ContextMapCreateDialogType> = ({
  projectId,
  closeDialog,
}) => {
  const { register, handleSubmit, setError } =
    useForm<ContextMapWithoutParsing>();

  const { mutateAsync } = useContextMapCreate(projectId);
  const { toast } = useToast();

  const onSubmit = async (data: ContextMapWithoutParsing) => {
    try {
      const parsedContextMap: ContextMap = JSON.parse(data.contextMap);
      if (parsedContextMap.nodes.length == 0) {
        toast({
          title: "Zero nodes provided!",
          description: "Specify atleast 1 node!",
        });
      } else {
        await mutateAsync({
          projectId: projectId,
          version: data.version,
          commitHash: data.commitHash,
          contextMap: parsedContextMap,
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
          <Label htmlFor="jsonCallgraph">Context Map</Label>
          <Textarea
            className="min-h-64"
            placeholder={exampleContextMap}
            id="jsonCallgraph"
            rows={20}
            {...register("contextMap")}
          />
        </div>
      </div>
      <Button type="submit" className="w-1/6">
        <Upload />
      </Button>
    </form>
  );
};

export default ContextMapCreateDialog;
