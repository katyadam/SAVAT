import { AnalysisInputsTable } from "@/components/inputs/AnalysisInputsTable";
import { columns } from "@/components/inputs/Columns";
import { useAnalysisInputs } from "@/hooks/useAnalysisInput";
import {
  useDeleteProject,
  useProject,
  useProjectSummary,
} from "@/hooks/useProject";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "@/components/loading/Loading";
import Overlay from "@/components/ui/Overlay";
import CallGraphInputCreateDialog from "@/components/projects/CallGraphInputCreateDIalog";
import AnalysisInputCreateDialog from "@/components/projects/AnalysisInputCreateDialog";
import CallGraphsTab from "@/components/callgraphs/CallGraphsTab";
import { FileOperation } from "@/components/projects/types";
import CreateEntrypoint from "@/components/projects/CreateEntrypoint";
import { Separator } from "@/components/ui/separator";
import { Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ConfirmWindow from "@/components/ui/ConfirmWindow";

const ProjectPage = () => {
  const { id: projectId } = useParams();
  const [importExportDialogUp, showImportExportDialog] =
    useState<FileOperation | null>(null);
  const [activeTab, setActive] = useState<string>(
    localStorage.getItem("activeTab") || "components"
  );

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  const { data: project, isLoading: projectLoading } = useProject(
    projectId || ""
  );
  const { data: inputs, isLoading: inputsLoading } = useAnalysisInputs(
    projectId || ""
  );

  const { mutateAsync } = useDeleteProject();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isOpen, openConfirmWindow] = useState<boolean>(false);
  const { data: projectSummary } = useProjectSummary(projectId || "");
  const handleProjectDelete = async () => {
    try {
      if (projectId) {
        await mutateAsync(projectId);
        navigate("/");
        toast({
          title: "Project Removed!",
        });
      }
    } catch (error: unknown) {
      let errorMessage = "An unexpected error occurred";

      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      }

      toast({
        title: "Something BAD happened, couldn't delete project!",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  return projectId ? (
    <div className="m-5">
      <div className="flex flex-row justify-between">
        {projectLoading ? (
          <Loading overlay={false} />
        ) : (
          <h1 className="text-2xl font-semibold">{project?.projectName}</h1>
        )}
        <div className="flex flex-row gap-2 items-center">
          <CreateEntrypoint showImportExportDialog={showImportExportDialog} />
          <Separator className="p-0.5" orientation="vertical" />
          <div className="flex flex-col items-center">
            <p className="font-semibold text-gray-500">Delete This Project</p>
            <Trash2
              className="cursor-pointer"
              onClick={() => openConfirmWindow(true)}
            />
          </div>
        </div>
      </div>

      <Tabs
        defaultValue={activeTab}
        onValueChange={(value) => setActive(value)}
      >
        <TabsList className="flex flex-row py-2 text-center border-gray-300">
          <TabsTrigger
            value="components"
            className={
              "py-2 px-4 rounded-l-md transition-all duration-200 focus:outline-none" +
              (activeTab === "components" ? " bg-gray-300" : "")
            }
          >
            Components
          </TabsTrigger>
          <TabsTrigger
            value="callgraphs"
            className={
              "py-2 px-4 rounded-r-md transition-all duration-200 focus:outline-none" +
              (activeTab === "callgraphs" ? " bg-gray-300" : "")
            }
          >
            Call Graphs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="components">
          {inputsLoading ? (
            <Loading overlay={false} />
          ) : (
            <AnalysisInputsTable
              columns={columns}
              data={inputs!}
              projectId={projectId}
            />
          )}
        </TabsContent>

        <TabsContent value="callgraphs">
          <CallGraphsTab projectId={projectId} />
        </TabsContent>
      </Tabs>
      {importExportDialogUp != null && (
        <Overlay width="w-1/2" closeFunc={() => showImportExportDialog(null)}>
          {importExportDialogUp == FileOperation.IMPORT &&
            activeTab === "callgraphs" && (
              <CallGraphInputCreateDialog
                projectId={projectId}
                closeDialog={() => showImportExportDialog(null)}
              />
            )}
          {importExportDialogUp == FileOperation.IMPORT &&
            activeTab === "components" && (
              <AnalysisInputCreateDialog
                projectId={projectId}
                closeDialog={() => showImportExportDialog(null)}
              />
            )}
        </Overlay>
      )}
      {isOpen && (
        <ConfirmWindow
          closeFunc={() => openConfirmWindow(false)}
          title="Do you really want to delete this project ?"
          width="w-1/4"
          options={[
            {
              title: "YES",
              callback: () => handleProjectDelete(),
              btnVariant: "destructive",
            },
            {
              title: "NO",
              callback: () => openConfirmWindow(false),
              btnVariant: "ghost",
            },
          ]}
          body={
            <div className="flex flex-col items-start gap-2 mb-5">
              <p className="">
                Analysis Inputs:{" "}
                <span className="text-xl font-bold">
                  {projectSummary && projectSummary.totalAnalysisInputs}
                </span>
              </p>
              <p>
                Call Graph Inputs:{" "}
                <span className="text-xl font-bold">
                  {projectSummary && projectSummary.totalCallGraphInputs}
                </span>
              </p>
              <p>
                Change Impact Analysis Outputs:{" "}
                <span className="text-xl font-bold">
                  {projectSummary && projectSummary.totalCallGraphOutputs}
                </span>
              </p>
            </div>
          }
        />
      )}
    </div>
  ) : (
    <Loading />
  );
};

export default ProjectPage;
