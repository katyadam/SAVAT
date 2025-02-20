import { CirclePlus } from "lucide-react";
import { FC } from "react";
import { FileOperation } from "./types";

type CreateEntrypointType = {
  showImportExportDialog: (which: FileOperation | null) => void;
};

const CreateEntrypoint: FC<CreateEntrypointType> = ({
  showImportExportDialog,
}) => {
  return (
    <div className="flex flex-row gap-4">
      <div className="flex flex-col items-center">
        <p className="font-semibold text-gray-500">Create</p>
        <CirclePlus
          className="cursor-pointer"
          onClick={() => showImportExportDialog(FileOperation.IMPORT)}
        />
      </div>
    </div>
  );
};

export default CreateEntrypoint;
