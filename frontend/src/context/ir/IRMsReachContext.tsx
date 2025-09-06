import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useReducer,
} from "react";

type IRMsReachState = {
  msId: string | null;
  reachValue: number | null;
};

type IRMsReachAction =
  | {
      type: "SET_MS_REACH";
      payload: { msId: string; reachValue: number };
    }
  | { type: "REMOVE_MS_REACH" };

const IRMsReachContext = createContext<
  | {
      irMsReachState: IRMsReachState;
      irMsReachDispatch: React.Dispatch<IRMsReachAction>;
    }
  | undefined
>(undefined);

const irMsReachReducer = (
  state: IRMsReachState,
  action: IRMsReachAction
): IRMsReachState => {
  switch (action.type) {
    case "SET_MS_REACH":
      return { ...action.payload };
    case "REMOVE_MS_REACH":
      return { msId: null, reachValue: null };
    default:
      return state;
  }
};

export const IRMsReachProvider: FC<PropsWithChildren> = ({ children }) => {
  const [irMsReachState, irMsReachDispatch] = useReducer(irMsReachReducer, {
    msId: null,
    reachValue: null,
  });

  return (
    <IRMsReachContext.Provider value={{ irMsReachState, irMsReachDispatch }}>
      {children}
    </IRMsReachContext.Provider>
  );
};

export const useIRMsReach = () => {
  const context = useContext(IRMsReachContext);
  if (!context) {
    throw new Error("useIRMsReach must be used within IRMsReachProvider!");
  }
  return context;
};
