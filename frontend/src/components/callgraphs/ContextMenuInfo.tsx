import { FC } from "react";

type ContextMenuInfoType = {
  label: string;
  value: string | string[];
};

const ContextMenuInfo: FC<ContextMenuInfoType> = ({ label, value }) => {
  return (
    <div className="flex flex-col">
      <span className="text-xs font-semibold text-gray-500">{label}</span>
      {typeof value === "string"
        ? value
        : Array.isArray(value)
        ? value.map((str, index) => <p key={index}>{str}</p>)
        : null}
    </div>
  );
};

export default ContextMenuInfo;
