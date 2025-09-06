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
  | { type: "MOVE_TO_NEXT" }
  | { type: "SET_SELECTED_FILE"; payload: string };

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
      localStorage.setItem("selectedIRFile", action.payload.selectedIRFile);
      return { ...action.payload };
    case "MOVE_TO_NEXT": {
      if (state.selectedIRFile) {
        const currIndex = state.irFiles.indexOf(state.selectedIRFile);
        const selectedIRFile =
          currIndex + 1 < state.irFiles.length
            ? state.irFiles[currIndex + 1]
            : state.selectedIRFile;
        localStorage.setItem("selectedIRFile", selectedIRFile);
        return {
          irFiles: state.irFiles,
          selectedIRFile: selectedIRFile,
        };
      }
      return { ...state };
    }
    case "MOVE_TO_PREV": {
      if (state.selectedIRFile) {
        const currIndex = state.irFiles.indexOf(state.selectedIRFile);
        const selectedIRFile =
          currIndex != 0 ? state.irFiles[currIndex - 1] : state.selectedIRFile;
        localStorage.setItem("selectedIRFile", selectedIRFile);
        return {
          irFiles: state.irFiles,
          selectedIRFile: selectedIRFile,
        };
      }
      return { ...state };
    }
    case "SET_SELECTED_FILE": {
      localStorage.setItem("selectedIRFile", action.payload);
      return { irFiles: state.irFiles, selectedIRFile: action.payload };
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
  let context = useContext(SelectedIRFileContext);
  if (!context) {
    throw new Error(
      "useSelectedIRFile must be used within SelectedIRFileProvider!"
    );
  }
  if (!context.selectedIRFileState.selectedIRFile) {
    context = {
      selectedIRFileState: {
        selectedIRFile: localStorage.getItem("selectedIRFile"),
        irFiles: context.selectedIRFileState.irFiles,
      },
      selectedIRFileDispatch: context.selectedIRFileDispatch,
    };
  }
  return context;
};
