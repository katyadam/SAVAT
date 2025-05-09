import { ContextMapDto } from "@/api/context-maps/types";
import { useToast } from "@/hooks/use-toast";
import { useContextMapChangeImpactAnalysis } from "@/hooks/useContextMapOutput";
import { FC, useState } from "react";
import InputsList from "./InputsList";
import { Button } from "@/components/ui/button";
import InputInfoBlock from "./InputInfoBlock";
import { ArrowRightLeft } from "lucide-react";
import { ToastAction } from "@/components/ui/toast";
import { useNavigate } from "react-router-dom";

type CIAPanelType = {
  projectId: string;
};

const CIAPanel: FC<CIAPanelType> = ({ projectId }) => {
  const [leftSelected, setLeftSelected] = useState<ContextMapDto | null>(null);
  const [rightSelected, setRightSelected] = useState<ContextMapDto | null>(
    null
  );

  const { mutateAsync } = useContextMapChangeImpactAnalysis(projectId);

  const { toast } = useToast();

  const navigate = useNavigate();
  const routeToNewCIA = (newCIAId: number) => {
    navigate(`/context-map-output/${newCIAId}/context-map`);
  };

  const handleCiaDispatch = async () => {
    try {
      if (leftSelected && rightSelected) {
        const createdCIA = await mutateAsync({
          projectId: projectId,
          sourceContextMapId: leftSelected.id,
          targetContextMapId: rightSelected.id,
        });

        toast({
          title: "Successfully created new Analysis",
          action: (
            <ToastAction
              altText="Try again"
              onClick={() => routeToNewCIA(createdCIA.id)}
            >
              Show
            </ToastAction>
          ),
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
        title: "Something BAD happened, couldn't compare context maps!",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <h1 className="text-md font-bold">Select Context Map Inputs</h1>
      <div className="flex flex-row justify-between items-center">
        <InputsList
          key={1}
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
          key={2}
          projectId={projectId}
          inputToOmit={leftSelected}
          selectedInput={rightSelected}
          setSelectedInput={setRightSelected}
        />
      </div>
    </div>
  );
};

export default CIAPanel;
