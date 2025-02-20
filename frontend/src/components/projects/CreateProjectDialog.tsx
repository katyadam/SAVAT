import { Label } from "../ui/label";
import { PlusCircle } from "lucide-react";
import { Input } from "../ui/input";
import { CreateProject } from "@/api/projects/types";
import { useForm } from "react-hook-form";
import { useCreateProject } from "@/hooks/useProject";
import { useToast } from "@/hooks/use-toast";
import { FC } from "react";

type CreateProjectDialogType = {
  closeDialog: () => void;
};

const CreateProjectDialog: FC<CreateProjectDialogType> = ({ closeDialog }) => {
  const { register, handleSubmit, setError } = useForm<CreateProject>();
  const { mutateAsync } = useCreateProject();
  const { toast } = useToast();
  const onSubmit = async (data: CreateProject) => {
    try {
      await mutateAsync(data);
      closeDialog();
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError("projectName", {
          type: "manual",
          message: "Invalid string!",
        });
        toast({
          title: "Error occured!",
          description: "Try again",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center justify-between w-full h-full gap-4"
      id="projectForm"
    >
      <Label htmlFor="projectName">New Project Name</Label>
      <Input id="projectName" {...register("projectName")} />
      <button>
        <PlusCircle className="cursor-pointer w-12 h-12 hover:text-green-800 duration-300" />
      </button>
    </form>
  );
};
export default CreateProjectDialog;
