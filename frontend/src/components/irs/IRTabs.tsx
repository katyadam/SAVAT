import { useIRFiles } from "@/hooks/useIR";
import { FC } from "react";
import Loading from "../loading/Loading";
import { useNavigate } from "react-router-dom";
import { useSelectedIRFile } from "@/context/SelectedIRFileContext";

type IRTabsType = {};

const IRTabs: FC<IRTabsType> = () => {
  const { data: irFiles, isLoading } = useIRFiles();
  const navigate = useNavigate();
  const { selectedIRFileDispatch } = useSelectedIRFile();
  if (isLoading) return <Loading />;

  if (!irFiles) return <div>No data loaded</div>;
  return (
    <div className="overflow-y-auto max-h-[600px]">
      {irFiles &&
        irFiles.map((file, i) => (
          <div
            className="cursor-pointer border-b p-2 hover:bg-slate-200 duration-200"
            onClick={() => {
              selectedIRFileDispatch({
                payload: { selectedIRFile: file, irFiles: irFiles },
                type: "SET_INITIAL_STATE",
              });
              navigate(`/ir-viewer`);
            }}
            key={i}
          >
            <p className="text-2xl">{file}</p>
          </div>
        ))}
    </div>
  );
};

export default IRTabs;
