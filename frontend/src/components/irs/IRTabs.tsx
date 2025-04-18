import { useIRFiles } from "@/hooks/useIR";
import { FC } from "react";
import Loading from "../loading/Loading";

type IRTabsType = {};

const IRTabs: FC<IRTabsType> = () => {
  const { data: irFiles, isLoading } = useIRFiles();

  if (isLoading) return <Loading />;

  if (!irFiles) return <div>No data loaded</div>;

  return (
    <div className="overflow-y-auto max-h-[600px]">
      {irFiles
        .sort((a, b) => {
          const numA = parseInt(a.split("_")[0].slice(2));
          const numB = parseInt(b.split("_")[0].slice(2));
          return numA - numB;
        })
        .map((file, i) => (
          <div
            className="cursor-pointer border-b p-2 hover:bg-slate-200 duration-200"
            onClick={() => console.log("hehe")}
            key={i}
          >
            <p className="text-2xl">{file}</p>
          </div>
        ))}
    </div>
  );
};

export default IRTabs;
