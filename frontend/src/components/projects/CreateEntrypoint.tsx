import { CirclePlus } from "lucide-react";
import { FC } from "react";

export enum FileOperation {
  IMPORT,
  EXPORT,
}

type CreateEntrypoint = {
  showImportExportDialog: (which: FileOperation | null) => void;
};

const CreateEntrypoint: FC<CreateEntrypoint> = ({ showImportExportDialog }) => {
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
