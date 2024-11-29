import { EntityField, EntityNode } from "@/api/entities";
import { FC } from "react";
import { Button } from "../ui/button";

type EntitiesDetailProps = {
  entity: EntityNode;
  handleFieldClick: (field: EntityField) => void;
};

const EntityDetail: FC<EntitiesDetailProps> = ({
  entity,
  handleFieldClick,
}) => {
  return (
    <div className="flex p-5 gap-5 bg-white">
      <div>
        <div className="flex flex-col mb-4 items-start">
          <h2 className="text-sm font-medium text-gray-600">Microservice</h2>
          <p className="text-xl text-gray-700">{entity.msName}</p>
        </div>
        <div className="flex flex-col mb-4 items-start">
          <h2 className="text-sm font-medium text-gray-600">Entity</h2>
          <p className="text-xl text-gray-700">{entity.nodeName}</p>
        </div>
        <div className="flex flex-col mb-4 items-start">
          <h2 className="text-sm font-medium text-gray-600">
            Entity - Full Name
          </h2>
          <p className="text-xl text-gray-700">{entity.nodeFullName}</p>
        </div>
      </div>

      <div>
        <h1 className="text-4xl font-bold mb-4">Fields</h1>
        <div className="space-y-2">
          {entity.fields.length > 0 ? (
            entity.fields.map((field) => (
              <div key={field.fieldFullName}>
                <Button
                  variant="ghost"
                  className="text-lg w-full text-gray-800"
                  onClick={() => handleFieldClick(field)}
                >
                  {field.fieldFullName}
                </Button>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No fields available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EntityDetail;
