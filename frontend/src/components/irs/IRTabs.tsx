import { useIRFiles } from "@/hooks/useIR";
import { FC } from "react";
import Loading from "../loading/Loading";
import { useNavigate } from "react-router-dom";

type IRTabsType = {};

const IRTabs: FC<IRTabsType> = () => {
  const { data: irFiles, isLoading } = useIRFiles();
  const navigate = useNavigate();

  if (isLoading) return <Loading />;

  if (!irFiles) return <div>No data loaded</div>;
  console.log(irFiles);
  return (
    <div className="overflow-y-auto max-h-[600px]">
      {irFiles &&
        irFiles
          .sort((a, b) => {
            const numA = parseInt(a.split("_")[0].slice(2));
            const numB = parseInt(b.split("_")[0].slice(2));
            return numA - numB;
          })
          .map((file, i) => (
            <div
              className="cursor-pointer border-b p-2 hover:bg-slate-200 duration-200"
              onClick={() => navigate(`/ir/${file}`)}
              key={i}
            >
              <p className="text-2xl">{file}</p>
            </div>
          ))}
    </div>
  );
};

export default IRTabs;
