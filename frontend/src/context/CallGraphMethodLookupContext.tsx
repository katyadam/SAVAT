import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useReducer,
} from "react";

type CallGraphLookupState = {
  method: string | null;
};

type CallGraphLookupAction =
  | { type: "LOOKUP_METHOD"; payload: string }
  | { type: "REMOVE_LOOKUP" };

const CallGraphLookupContext = createContext<
  | {
      callGraphLookupState: CallGraphLookupState;
      callGraphLookupDispatch: React.Dispatch<CallGraphLookupAction>;
    }
  | undefined
>(undefined);

const callGraphLookupReducer = (
  state: CallGraphLookupState,
  action: CallGraphLookupAction
): CallGraphLookupState => {
  switch (action.type) {
    case "LOOKUP_METHOD":
      return { method: action.payload };
    case "REMOVE_LOOKUP":
      return { method: null };
    default:
      return state;
  }
};

export const CallGraphLookupProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [callGraphLookupState, callGraphLookupDispatch] = useReducer(
    callGraphLookupReducer,
    { method: null }
  );

  return (
    <CallGraphLookupContext.Provider
      value={{ callGraphLookupState, callGraphLookupDispatch }}
    >
      {children}
    </CallGraphLookupContext.Provider>
  );
};

export const useCallGraphLookup = () => {
  const context = useContext(CallGraphLookupContext);
  if (!context) {
    throw new Error(
      "useCallGraphLookup must be used within CallGraphLookupProvider!"
    );
  }
  return context;
};
