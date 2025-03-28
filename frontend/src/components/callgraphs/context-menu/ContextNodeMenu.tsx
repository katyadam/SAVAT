import { FC, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { CallGraph, CallGraphMethod } from "@/api/callgraphs/types";
import { Button } from "../../ui/button";
import { CircleEllipsis, ClipboardCopy, Info, X } from "lucide-react";
import ContextMenuInfo from "./ContextMenuInfo";
import { toast } from "@/hooks/use-toast";
import { useCallGraphInput, useMethodReachability } from "@/hooks/useCallGraph";
import { get_element_gh_url } from "@/api/github/connect";
import { useProject } from "@/hooks/useProject";
import NumberInput from "@/components/ui/NumberInput";

type ContextNodeMenuType = {
  selectedMethod: string | null;
  methodsMap: Map<string, CallGraphMethod>;
  close: (arg0: boolean) => void;
  callGraphInputId: string;
  setMethodReachabilityCG: (arg0: CallGraph) => void;
  variant: "inputs" | "outputs";
};

const ContextNodeMenu: FC<ContextNodeMenuType> = ({
  selectedMethod,
  methodsMap,
  close,
  callGraphInputId,
  setMethodReachabilityCG,
  variant,
}) => {
  const [method, setMethod] = useState<CallGraphMethod | null>(null);
  const [showMethodDetails, setShowMethodDetails] = useState<boolean>(false);
  const [reachValue, setReachValue] = useState<number>(0);

  const { mutateAsync } = useMethodReachability(callGraphInputId, variant);

  const { data: project, isLoading } = useProject(
    localStorage.getItem("selectedProjectId") || ""
  );

  const { data: callGraphInput, isLoading: cgInputLoading } =
    useCallGraphInput(callGraphInputId);

  const handleDisplayReachability = async (methodSignature: string | null) => {
    if (methodSignature) {
      const methodReachabilityCG = await mutateAsync(methodSignature);
      console.log("Successfully retrieved: " + methodReachabilityCG);
      setMethodReachabilityCG(methodReachabilityCG);
    } else {
      console.error("methodSignature is null!");
    }
  };

  const handleMethodLookup = async (methodSignature: string | null) => {
    if (methodSignature) {
      const method = methodsMap.get(methodSignature);
      if (
        method &&
        !isLoading &&
        project &&
        !cgInputLoading &&
        callGraphInput
      ) {
        const url = await get_element_gh_url(
          method?.returnType.split(".").pop() + " " + method?.name + "(",
          method?.microservice,
          method?.type,
          callGraphInput.branch,
          {
            id: 52,
            accessToken: project.accessToken,
            name: project.name,
            owner: project.owner,
            repository: project.repository,
          }
        );
        window.open(url, "_blank");
      }
    }
  };

  useEffect(() => {
    if (selectedMethod && methodsMap.has(selectedMethod)) {
      setMethod(methodsMap.get(selectedMethod)!);
    }
  }, [selectedMethod, methodsMap]);
  console.log(method);
  return method && !isLoading && !cgInputLoading ? (
    <Card className="border-t-transparent border-l-transparent shadow-none rounded-none">
      <CardHeader>
        <div className="flex flex-row justify-between items-center">
          <CardTitle className="mr-10">{method.name}</CardTitle>
          <div className="flex gap-2">
            {showMethodDetails ? (
              <CircleEllipsis
                className="cursor-pointer"
                onClick={(event) => {
                  event.stopPropagation();
                  setShowMethodDetails(false);
                }}
              />
            ) : (
              <Info
                className="cursor-pointer"
                onClick={(event) => {
                  event.stopPropagation();
                  setShowMethodDetails(true);
                }}
              />
            )}
          </div>
          <X
            className="cursor-pointer text-red-500 absolute bottom-1 right-1"
            onClick={() => close(false)}
          />
        </div>
        <CardDescription>{method.microservice}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 justify-between">
        {showMethodDetails ? (
          <>
            <ContextMenuInfo label="Class">
              <p>{method.type}</p>
            </ContextMenuInfo>
            <ContextMenuInfo label="Bytecode Hash">
              <div className="flex items-center">
                {`${method.bytecodeHash.slice(
                  0,
                  5
                )}...${method.bytecodeHash.slice(-5)}`}
                <Button
                  variant="link"
                  onClick={() => {
                    toast({
                      title: "Copied!",
                      description: (
                        <div className="max-w-xs break-words">
                          {method.bytecodeHash}
                        </div>
                      ),
                    });
                    navigator.clipboard.writeText(method.bytecodeHash);
                  }}
                >
                  <ClipboardCopy />
                </Button>
              </div>
            </ContextMenuInfo>
            <ContextMenuInfo label="Is Entrypoint">
              <p>{method.entryPoint ? "Yes" : "No"}</p>
            </ContextMenuInfo>
            <ContextMenuInfo label="Flags">
              <p>{method.flags}</p>
            </ContextMenuInfo>
            <ContextMenuInfo label="Parameters">
              {method.parameters.map((param, index) => (
                <p key={index}>{param}</p>
              ))}
            </ContextMenuInfo>
            <ContextMenuInfo label="Return type">
              <p>{method.returnType}</p>
            </ContextMenuInfo>
            {method.endpointMethod && (
              <>
                <ContextMenuInfo label="Endpoint URI">
                  <p>{method.endpointURI}</p>
                </ContextMenuInfo>
                <ContextMenuInfo label="HTTP Method">
                  <p>{method.httpMethod}</p>
                </ContextMenuInfo>
              </>
            )}
          </>
        ) : (
          <div className="flex flex-col gap-2 items-center">
            <Button
              onClick={() => handleDisplayReachability(selectedMethod)}
              variant="ghost"
              className="py-1.5 w-full text-sm font-semibold"
            >
              <p className="text-left">Display Reachability</p>
            </Button>
            <Button
              onClick={() => handleMethodLookup(selectedMethod)}
              variant="ghost"
              className="py-1.5 w-full text-sm font-semibold"
            >
              <p className="text-left">Find on GitHub</p>
            </Button>
            <NumberInput
              value={reachValue}
              setValue={setReachValue}
              min={0}
              max={5}
              step={1}
            />
          </div>
        )}
      </CardContent>
    </Card>
  ) : (
    <p>Loading...</p>
  );
};

export default ContextNodeMenu;
