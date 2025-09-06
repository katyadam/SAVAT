import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useReducer,
} from "react";

type CGMethodReachState = {
  methodSignature: string | null;
  reachValue: number | null;
};

type CGMethodReachAction =
  | {
      type: "SET_METHOD_REACH";
      payload: { methodSignature: string; reachValue: number };
    }
  | { type: "REMOVE_METHOD_REACH" };

const CGMethodReachContext = createContext<
  | {
      cgMethodReachState: CGMethodReachState;
      cgMethodReachDispatch: React.Dispatch<CGMethodReachAction>;
    }
  | undefined
>(undefined);

const cgMethodReachReducer = (
  state: CGMethodReachState,
  action: CGMethodReachAction
): CGMethodReachState => {
  switch (action.type) {
    case "SET_METHOD_REACH":
      return { ...action.payload };
    case "REMOVE_METHOD_REACH":
      return { methodSignature: null, reachValue: null };
    default:
      return state;
  }
};

export const CGMethodReachProvider: FC<PropsWithChildren> = ({ children }) => {
  const [cgMethodReachState, cgMethodReachDispatch] = useReducer(
    cgMethodReachReducer,
    { methodSignature: null, reachValue: null }
  );

  return (
    <CGMethodReachContext.Provider
      value={{ cgMethodReachState, cgMethodReachDispatch }}
    >
      {children}
    </CGMethodReachContext.Provider>
  );
};

export const useCallGraphMethodReach = () => {
  const context = useContext(CGMethodReachContext);
  if (!context) {
    throw new Error(
      "useCallGraphMethodReach must be used within CGMethodReachProvider!"
    );
  }
  return context;
};
