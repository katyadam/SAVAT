import { FC, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { CallGraphMethod } from "@/api/callgraphs/types";
import { Button } from "../ui/button";
import { CircleEllipsis, ClipboardCopy, Info } from "lucide-react";
import ContextMenuInfo from "./ContextMenuInfo";
import { toast } from "@/hooks/use-toast";

type ContextMenuType = {
  selectedMethod: string | null;
  methodsMap: Map<string, CallGraphMethod>;
};

const ContextMenu: FC<ContextMenuType> = ({ selectedMethod, methodsMap }) => {
  const [method, setMethod] = useState<CallGraphMethod | null>(null);
  const [showMethodDetails, setShowMethodDetails] = useState<boolean>(false);

  useEffect(() => {
    if (selectedMethod && methodsMap.has(selectedMethod)) {
      setMethod(methodsMap.get(selectedMethod)!);
    }
  }, [selectedMethod, methodsMap]);
  console.log(method);
  return method ? (
    <Card>
      <CardHeader>
        <div className="flex flex-row justify-between">
          <CardTitle className="mr-10">{method.name}</CardTitle>
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
        <CardDescription>{method.microservice}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 justify-between">
        {showMethodDetails ? (
          <>
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
            <ContextMenuInfo
              label="Is Entrypoint"
              value={method.isEntryPoint ? "Yes" : "No"}
            />
            <ContextMenuInfo label="Flags" value={method.flags} />
            <ContextMenuInfo label="Parameters" value={method.parameters} />
            <ContextMenuInfo label="Return type" value={method.returnType} />
            {method.endpointMethod && (
              <>
                <ContextMenuInfo
                  label="Endpoint URI"
                  value={method.endpointURI}
                />
                <ContextMenuInfo
                  label="HTTP Method"
                  value={method.httpMethod}
                />
              </>
            )}
          </>
        ) : (
          <>
            <Button variant="ghost" className="py-1.5 text-sm font-semibold">
              <p className="text-left">Highlight Adjacents</p>
            </Button>
            <Button variant="ghost" className="py-1.5 text-sm font-semibold">
              <p className="text-left">Display Reachability</p>
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  ) : (
    <p>Loading...</p>
  );
};

export default ContextMenu;
