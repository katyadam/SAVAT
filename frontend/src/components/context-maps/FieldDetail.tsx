import { Field } from "@/api/context-maps/types";
import { FC } from "react";

type FieldDetailProps = {
  field: Field;
};

const FieldDetail: FC<FieldDetailProps> = ({ field }) => {
  return (
    <div className="flex flex-col gap-2 border-l p-5">
      <div className="flex flex-col mb-4 items-start">
        <h2 className="text-sm font-medium text-gray-600">Name</h2>
        <p className="text-xl text-gray-700">{field.fieldName}</p>
      </div>
      <div className="flex flex-col mb-4 items-start">
        <h2 className="text-sm font-medium text-gray-600">Full Name</h2>
        <p className="text-xl text-gray-700">{field.fieldFullName}</p>
      </div>
      <div className="flex flex-col mb-4 items-start">
        <h2 className="text-sm font-medium text-gray-600">Entity Ref Name</h2>
        <p className="text-xl text-gray-700">{field.fieldEntityRefName}</p>
      </div>
      <div className="flex flex-col mb-4 items-start">
        <h2 className="text-sm font-medium text-gray-600">Type</h2>
        <p className="text-xl text-gray-700">{field.fieldType}</p>
      </div>
      <div className="flex flex-col mb-4 items-start">
        <h2 className="text-sm font-medium text-gray-600">Is Reference ?</h2>
        <p className="text-xl text-gray-700">
          {field.fieldIsReference ? "Yes" : "No"}
        </p>
      </div>
      <div className="flex flex-col mb-4 items-start">
        <h2 className="text-sm font-medium text-gray-600">Is Collection ?</h2>
        <p className="text-xl text-gray-700">
          {field.isCollection ? "Yes" : "No"}
        </p>
      </div>
    </div>
  );
};

export default FieldDetail;
