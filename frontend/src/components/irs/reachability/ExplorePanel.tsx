import NumberInput from "@/components/ui/NumberInput";
import { FC, useEffect, useState } from "react";
import SubGraph from "../graphs/Subgraph";
import { Graph } from "@/api/irs/types";
import {
  getIRSubGraph,
  getMaxSubgraphReachLevel,
} from "@/api/irs/graphFunctions";
import { useIRMsReach } from "@/context/ir/IRMsReachContext";

type ExplorePanelType = {
  graph: Graph;
};
const ExplorePanel: FC<ExplorePanelType> = ({ graph }) => {
  const { irMsReachState, irMsReachDispatch } = useIRMsReach();

  const [subGraph, setSubGraph] = useState<Graph | null>(null);
  useEffect(() => {
    if (irMsReachState.msId && irMsReachState.reachValue) {
      setSubGraph(
        getIRSubGraph(
          graph.nodes,
          graph.edges,
          irMsReachState.msId,
          irMsReachState.reachValue
        )
      );
    }
  }, [irMsReachState.reachValue]);

  const setReachValue = (reachValue: number) => {
    if (irMsReachState.msId)
      irMsReachDispatch({
        payload: {
          msId: irMsReachState.msId,
          reachValue: reachValue,
        },
        type: "SET_MS_REACH",
      });
    if (reachValue == 0) irMsReachDispatch({ type: "REMOVE_MS_REACH" });
  };

  return (
    subGraph &&
    irMsReachState.msId && (
      <div className="flex flex-col items-center gap-2">
        <NumberInput
          value={irMsReachState.reachValue || 0}
          setValue={setReachValue}
          min={0}
          max={getMaxSubgraphReachLevel(
            graph.nodes,
            graph.edges,
            irMsReachState.msId
          )}
          step={1}
        />
        {<SubGraph graph={subGraph} />}
      </div>
    )
  );
};

export default ExplorePanel;
