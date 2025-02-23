import { FC, useState } from "react";
import InputsList from "./InputsList";
import { CallGraphInputSimple } from "@/api/callgraphs/types";
import InputInfoBlock from "./InputInfoBlock";
import { ArrowRightLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCallGraphChangeImpactAnalysis } from "@/hooks/useCallGraphOutput";
import { useToast } from "@/hooks/use-toast";

type CompareDialogType = {
  projectId: string;
};

const CompareDialog: FC<CompareDialogType> = ({ projectId }) => {
  const [leftSelected, setLeftSelected] = useState<CallGraphInputSimple | null>(
    null
  );
  const [rightSelected, setRightSelected] =
    useState<CallGraphInputSimple | null>(null);

  const { mutateAsync } = useCallGraphChangeImpactAnalysis(projectId);

  const { toast } = useToast();

  const handleCiaDispatch = async () => {
    try {
      if (leftSelected && rightSelected) {
        await mutateAsync({
          projectId: projectId,
          sourceCallGraphInputId: leftSelected.id,
          targetCallGraphInputId: rightSelected.id,
        });
        toast({
          title: "Successfully created new Analysis",
        });
      } else {
        toast({
          title: "You need to specify both Source and Target!",
          description: "Please specify both!",
          variant: "destructive",
        });
      }
    } catch (error: unknown) {
      let errorMessage = "An unexpected error occurred";

      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      }

      toast({
        title: "Something BAD happened, couldn't compare call graphs!",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <h1 className="text-md font-bold">Select Call Graph inputs</h1>
      <div className="flex flex-row justify-between items-center">
        <InputsList
          projectId={projectId}
          inputToOmit={rightSelected}
          selectedInput={leftSelected}
          setSelectedInput={setLeftSelected}
        />
        <div className="flex flex-col gap-8">
          <div className="flex flex-row justify-between items-center gap-5">
            <InputInfoBlock input={leftSelected} />
            {leftSelected && rightSelected && <ArrowRightLeft />}
            <InputInfoBlock input={rightSelected} />
          </div>
          {leftSelected && rightSelected && (
            <Button onClick={handleCiaDispatch} variant="default">
              Compare
            </Button>
          )}
        </div>

        <InputsList
          projectId={projectId}
          inputToOmit={leftSelected}
          selectedInput={rightSelected}
          setSelectedInput={setRightSelected}
        />
      </div>
    </div>
  );
};

export default CompareDialog;
