import { useIRFiles } from "@/hooks/useIR";
import { FC } from "react";
import Loading from "../loading/Loading";

type IRTabsType = {
  projectId: string;
};

const IRTabs: FC<IRTabsType> = ({ projectId }) => {
  const { data: irFiles, isLoading } = useIRFiles();

  if (isLoading) return <Loading />;

  if (!irFiles) return <div>No data loaded</div>;

  return (
    <div>
      {irFiles.map((file) => (
        <p>{file}</p>
      ))}
    </div>
  );
};

export default IRTabs;
