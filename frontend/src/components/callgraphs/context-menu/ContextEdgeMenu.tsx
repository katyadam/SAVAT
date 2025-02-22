import { CallGraphCall } from "@/api/callgraphs/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { X } from "lucide-react";
import { FC, useEffect, useState } from "react";
import ContextMenuInfo from "./ContextMenuInfo";

type ContextEdgeMenuType = {
  selectedCall: string | null;
  callsMap: Map<string, CallGraphCall>;
  close: (arg0: boolean) => void;
};

type CallMetadata = {
  sourceReturnType: string | undefined;
  targetReturnType: string | undefined;
  sourceMethodName: string | undefined;
  targetMethodName: string | undefined;
  sourceClassName: string | undefined;
  targetClassName: string | undefined;
  sourceParams: string[] | undefined;
  targetParams: string[] | undefined;
  sourceMs: string | undefined;
  targetMs: string | undefined;
};

const ContextEdgeMenu: FC<ContextEdgeMenuType> = ({
  selectedCall,
  callsMap,
  close,
}) => {
  const [call, setCall] = useState<CallGraphCall | null>(null);
  const [callMetadata, setCallMetadata] = useState<CallMetadata | null>(null);

  useEffect(() => {
    if (selectedCall && callsMap.has(selectedCall)) {
      setCall(callsMap.get(selectedCall)!);
    }
  }, [selectedCall, callsMap]);

  useEffect(() => {
    if (call) {
      const sourceBeforeParams = call.source.split("(")[0].split(".");
      const targetBeforeParams = call.target.split("(")[0].split(".");
      setCallMetadata({
        sourceReturnType: call.source.split("/")[1].split(" ")[0],
        targetReturnType: call.target.split("/")[1].split(" ")[0],
        sourceMethodName: sourceBeforeParams?.pop(),
        targetMethodName: targetBeforeParams?.pop(),
        sourceClassName: sourceBeforeParams?.pop(),
        targetClassName: targetBeforeParams?.pop(),
        sourceParams: call.source.split("(")[1].slice(0, -1).split(","),
        targetParams: call.target.split("(")[1].slice(0, -1).split(","),
        sourceMs: call.source.split("/")[0],
        targetMs: call.target.split("/")[0],
      });
    }
  }, [call]);

  return call && callMetadata ? (
    <Card className="border-t-transparent border-l-transparent shadow-none rounded-none">
      <CardHeader>
        <div className="flex flex-row justify-between items-center">
          <CardTitle className="mr-10">
            {callMetadata.sourceMethodName} {"->"}{" "}
            {callMetadata.targetMethodName}
          </CardTitle>
          <X
            className="cursor-pointer text-red-500 absolute bottom-1 right-1"
            onClick={() => close(false)}
          />
        </div>
        <CardDescription>
          {callMetadata.sourceMs} {"->"} {callMetadata.targetMs}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 justify-between overflow-y-auto max-h-[500px]">
        <ContextMenuInfo label="Is Interservice Call">
          <p>{call.isInterserviceCall ? "Yes" : "No"}</p>
        </ContextMenuInfo>
        <div className="flex flex-row gap-3">
          <div className="p-2">
            <ContextMenuInfo label="Source Return Type">
              <p>{callMetadata.sourceReturnType}</p>
            </ContextMenuInfo>
            <ContextMenuInfo label="Source Method's Class">
              <p>{callMetadata.sourceClassName}</p>
            </ContextMenuInfo>
            <ContextMenuInfo label="Source Method's Parameters">
              {callMetadata.sourceParams?.map((param) => (
                <p key={param}>{param}</p>
              ))}
            </ContextMenuInfo>
          </div>
          <div className="p-2">
            <ContextMenuInfo label="Target Return Type">
              <p>{callMetadata.targetReturnType}</p>
            </ContextMenuInfo>
            <ContextMenuInfo label="Target Method's Class">
              <p>{callMetadata.targetClassName}</p>
            </ContextMenuInfo>
            <ContextMenuInfo label="Target Method's Parameters">
              {callMetadata.targetParams?.map((param) => (
                <p>{param}</p>
              ))}
            </ContextMenuInfo>
          </div>
        </div>
      </CardContent>
    </Card>
  ) : (
    <p>Loading...</p>
  );
};

export default ContextEdgeMenu;
