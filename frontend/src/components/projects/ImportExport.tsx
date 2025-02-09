import { Download } from "lucide-react";
import { FC } from "react";

export enum FileOperation {
  IMPORT,
  EXPORT,
}

type ImportExportType = {
  showImportExportDialog: (which: FileOperation | null) => void;
};

const ImportExport: FC<ImportExportType> = ({ showImportExportDialog }) => {
  return (
    <div className="flex flex-row gap-4">
      <div className="flex flex-col items-center">
        <p className="font-semibold text-gray-500">import</p>
        <Download
          className="cursor-pointer"
          onClick={() => showImportExportDialog(FileOperation.IMPORT)}
        />
      </div>
      {/* <div className="flex flex-col items-center">
        <p className="font-semibold text-gray-500">export</p>
        <Upload
          className="cursor-pointer"
          onClick={() => showImportExportDialog(FileOperation.EXPORT)}
        />
      </div> */}
    </div>
  );
};

export default ImportExport;
