import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useReducer,
} from "react";

type SelectedProjectState = {
  selectedProjectId: number | null;
};

type SelectedProjectAction = { type: "SET_PROJECT_ID"; payload: number };

const SelectedProjectContext = createContext<
  | {
      selectedProjectState: SelectedProjectState;
      selectedProjectDispatch: React.Dispatch<SelectedProjectAction>;
    }
  | undefined
>(undefined);

const selectedProjectReducer = (
  state: SelectedProjectState,
  action: SelectedProjectAction
): SelectedProjectState => {
  switch (action.type) {
    case "SET_PROJECT_ID":
      return { selectedProjectId: action.payload };
    default:
      return state;
  }
};

export const SelectedProjectProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [selectedProjectState, selectedProjectDispatch] = useReducer(
    selectedProjectReducer,
    { selectedProjectId: null }
  );

  return (
    <SelectedProjectContext.Provider
      value={{ selectedProjectState, selectedProjectDispatch }}
    >
      {children}
    </SelectedProjectContext.Provider>
  );
};

export const useSelectedProject = () => {
  const context = useContext(SelectedProjectContext);
  if (!context) {
    throw new Error(
      "useSelectedProject must be used within SelectedProjectProvider!"
    );
  }
  return context;
};
