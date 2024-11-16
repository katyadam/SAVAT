import { GraphNode } from "@/api/entities";
import { FC } from "react";

type EntitiesDetailProps = {
  entity: GraphNode;
};

const EntityDetail: FC<EntitiesDetailProps> = ({ entity }) => {
  return (
    <div className="flex flex-col gap-2 items-start">
      <p>
        <span className="text-2xl">Microservice: </span>
        {entity.msName}
      </p>
      <p>
        <span className="text-2xl">Entity:</span> {entity.nodeName}
      </p>
      <p>
        <span className="text-2xl">Entity - Full Name:</span>{" "}
        {entity.nodeFullName}
      </p>
      <h1 className="text-4xl">Fields</h1>
      <div>
        {entity.fields.map((field) => (
          <p>{field.fieldFullName}</p>
          // TODO: better!
        ))}
      </div>
    </div>
  );
};

export default EntityDetail;
