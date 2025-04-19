import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useReducer,
} from "react";

type SelectedIRFileState = {
  selectedIRFile: string | null;
  irFiles: string[];
};

type SelectedIRFileAction =
  | {
      type: "SET_INITIAL_STATE";
      payload: { selectedIRFile: string; irFiles: string[] };
    }
  | { type: "MOVE_TO_PREV" }
  | { type: "MOVE_TO_NEXT" };

const SelectedIRFileContext = createContext<
  | {
      selectedIRFileState: SelectedIRFileState;
      selectedIRFileDispatch: React.Dispatch<SelectedIRFileAction>;
    }
  | undefined
>(undefined);

const selectedIRFileReducer = (
  state: SelectedIRFileState,
  action: SelectedIRFileAction
): SelectedIRFileState => {
  switch (action.type) {
    case "SET_INITIAL_STATE":
      return { ...action.payload };
    case "MOVE_TO_NEXT": {
      if (state.selectedIRFile) {
        const currIndex = state.irFiles.indexOf(state.selectedIRFile);
        return {
          irFiles: state.irFiles,
          selectedIRFile:
            currIndex + 1 < state.irFiles.length
              ? state.irFiles[currIndex + 1]
              : state.selectedIRFile,
        };
      }
      return { ...state };
    }
    case "MOVE_TO_PREV": {
      if (state.selectedIRFile) {
        const currIndex = state.irFiles.indexOf(state.selectedIRFile);
        return {
          irFiles: state.irFiles,
          selectedIRFile:
            currIndex != 0
              ? state.irFiles[currIndex - 1]
              : state.selectedIRFile,
        };
      }
      return { ...state };
    }
    default:
      return state;
  }
};

export const SelectedIRFileProvider: FC<PropsWithChildren> = ({ children }) => {
  const [selectedIRFileState, selectedIRFileDispatch] = useReducer(
    selectedIRFileReducer,
    { selectedIRFile: null, irFiles: [] }
  );

  return (
    <SelectedIRFileContext.Provider
      value={{ selectedIRFileState, selectedIRFileDispatch }}
    >
      {children}
    </SelectedIRFileContext.Provider>
  );
};

export const useSelectedIRFile = () => {
  const context = useContext(SelectedIRFileContext);
  if (!context) {
    throw new Error(
      "useSelectedIRFile must be used within SelectedIRFileProvider!"
    );
  }
  return context;
};
