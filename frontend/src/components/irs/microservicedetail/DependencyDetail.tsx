import { Button } from "@/components/ui/button";
import { FC } from "react";

type DependencyDetailType = {
  dependencyMsName: string;
  openOrClose: () => void;
};

const DependencyDetail: FC<DependencyDetailType> = ({
  dependencyMsName,
  openOrClose,
}) => {
  return (
    <Button onClick={openOrClose} variant="ghost" className="bg-slate-200">
      {dependencyMsName}
    </Button>
  );
};

export default DependencyDetail;
