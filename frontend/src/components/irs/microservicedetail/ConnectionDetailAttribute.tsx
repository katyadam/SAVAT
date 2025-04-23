import { FC } from "react";

type ConnectionDetailAttributeType = {
  title: string;
  value: string;
};

const ConnectionDetailAttribute: FC<ConnectionDetailAttributeType> = ({
  title,
  value,
}) => {
  return (
    <div>
      <span className="text-sm font-bold">{title}</span>
      <p>{value}</p>
    </div>
  );
};

export default ConnectionDetailAttribute;
