import { FC, ReactNode } from "react";

type RequestDetailFieldType = {
  label: string;
  children: ReactNode;
};

const RequestDetailField: FC<RequestDetailFieldType> = ({
  children,
  label,
}) => {
  return (
    <div className="flex flex-col">
      <span className="text-xs font-semibold text-gray-500">{label}</span>
      <div>{children}</div>
    </div>
  );
};

export default RequestDetailField;
