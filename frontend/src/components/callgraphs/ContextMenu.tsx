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

type ContextMenuType = {
  selectedMethod: string | null;
  methodsMap: Map<string, CallGraphMethod>;
};

const ContextMenu: FC<ContextMenuType> = ({ selectedMethod, methodsMap }) => {
  const [method, setMethod] = useState<CallGraphMethod | null>(null);
  useEffect(() => {
    if (selectedMethod && methodsMap.has(selectedMethod)) {
      setMethod(methodsMap.get(selectedMethod)!);
    }
  }, [selectedMethod, methodsMap]);
  return method ? (
    <Card>
      <CardHeader>
        <CardTitle>{method.name}</CardTitle>
        <CardDescription>{method.microservice}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 justify-between">
        <Button variant="ghost" className="py-1.5 text-sm font-semibold">
          <p className="text-left">Complete Method Details</p>
        </Button>
        <Button variant="ghost" className="py-1.5 text-sm font-semibold">
          <p className="text-left">Highlight Adjacents</p>
        </Button>
        <Button variant="ghost" className="py-1.5 text-sm font-semibold">
          <p className="text-left">Display Path</p>
        </Button>
      </CardContent>
    </Card>
  ) : (
    <p>Loading...</p>
  );
};

export default ContextMenu;
