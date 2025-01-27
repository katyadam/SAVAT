import { FC, ReactNode } from "react";

type ContextMenuInfoProps = {
  label: string;
  children: ReactNode;
};

const ContextMenuInfo: FC<ContextMenuInfoProps> = ({ label, children }) => {
  return (
    <div className="flex flex-col">
      <span className="text-xs font-semibold text-gray-500">{label}</span>
      <div>{children}</div>
    </div>
  );
};

export default ContextMenuInfo;
