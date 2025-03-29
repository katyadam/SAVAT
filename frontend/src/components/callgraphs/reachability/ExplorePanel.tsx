import NumberInput from "@/components/ui/NumberInput";
import { useCallGraphMethodReach } from "@/context/CallGraphMethodReachContext";
import { GenericCallGraph } from "@/api/callgraphs/types";
import { FC, useEffect, useState } from "react";
import {
  getMaxSubgraphReachLevel,
  getSubgraph,
} from "@/api/callgraphs/subgraph";
import SubGraph from "../graphs/SubGraph";

type ExplorePanelType = {
  callGraph: GenericCallGraph;
  msColors: Map<string, string>;
};
const ExplorePanel: FC<ExplorePanelType> = ({ callGraph, msColors }) => {
  const { cgMethodReachState, cgMethodReachDispatch } =
    useCallGraphMethodReach();

  const [subGraph, setSubGraph] = useState<GenericCallGraph | null>(null);
  useEffect(() => {
    if (cgMethodReachState.methodSignature && cgMethodReachState.reachValue) {
      setSubGraph(
        getSubgraph(
          callGraph,
          cgMethodReachState.methodSignature,
          cgMethodReachState.reachValue
        )
      );
    }
  }, [cgMethodReachState.reachValue]);

  const setReachValue = (reachValue: number) => {
    if (cgMethodReachState.methodSignature)
      cgMethodReachDispatch({
        payload: {
          methodSignature: cgMethodReachState.methodSignature,
          reachValue: reachValue,
        },
        type: "SET_METHOD_REACH",
      });
    if (reachValue == 0) cgMethodReachDispatch({ type: "REMOVE_METHOD_REACH" });
  };

  return (
    subGraph &&
    cgMethodReachState.methodSignature && (
      <div className="flex flex-col items-center gap-2">
        <NumberInput
          value={cgMethodReachState.reachValue || 0}
          setValue={setReachValue}
          min={0}
          max={getMaxSubgraphReachLevel(
            callGraph,
            cgMethodReachState.methodSignature
          )}
          step={1}
        />
        {<SubGraph callGraph={subGraph} msColors={msColors} />}
      </div>
    )
  );
};

export default ExplorePanel;
