import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useReducer,
} from "react";

type IRMicroserviceLookupState = {
  msId: string | null;
};

type IRMicroserviceLookupAction =
  | { type: "LOOKUP_MS"; payload: string }
  | { type: "REMOVE_LOOKUP" };

const IRMicroserviceLookupContext = createContext<
  | {
      irMicroserviceLookupState: IRMicroserviceLookupState;
      irMicroserviceLookupDispatch: React.Dispatch<IRMicroserviceLookupAction>;
    }
  | undefined
>(undefined);

const irMicroserviceLookupReducer = (
  state: IRMicroserviceLookupState,
  action: IRMicroserviceLookupAction
): IRMicroserviceLookupState => {
  switch (action.type) {
    case "LOOKUP_MS":
      return { msId: action.payload };
    case "REMOVE_LOOKUP":
      return { msId: null };
    default:
      return state;
  }
};

export const IRMicroserviceLookupProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [irMicroserviceLookupState, irMicroserviceLookupDispatch] = useReducer(
    irMicroserviceLookupReducer,
    { msId: null }
  );

  return (
    <IRMicroserviceLookupContext.Provider
      value={{ irMicroserviceLookupState, irMicroserviceLookupDispatch }}
    >
      {children}
    </IRMicroserviceLookupContext.Provider>
  );
};

export const useIRMicroserviceLookup = () => {
  const context = useContext(IRMicroserviceLookupContext);
  if (!context) {
    throw new Error(
      "useIRMicroserviceLookup must be used within IRMicroserviceLookupProvider!"
    );
  }
  return context;
};
