import {
  useDeleteProject,
  useProject,
  useProjectSDGs,
  useProjectSummary,
} from "@/hooks/useProject";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "@/components/loading/Loading";
import Overlay from "@/components/ui/Overlay";
import CallGraphInputCreateDialog from "@/components/projects/CallGraphInputCreateDIalog";
import CallGraphsTabs from "@/components/callgraphs/CallGraphsTabs";
import { FileOperation } from "@/components/projects/types";
import CreateEntrypoint from "@/components/projects/CreateEntrypoint";
import { Separator } from "@/components/ui/separator";
import { Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ConfirmWindow from "@/components/ui/ConfirmWindow";
import { SDGsTable } from "@/components/sdgs/SDGsTable";
import { columns } from "@/components/sdgs/Columns";
import ContextMapCreateDialog from "@/components/projects/ContextMapCreateDialog";
import SDGCreateDialog from "@/components/projects/SDGCreateDialog";
import ContextMapsTabs from "@/components/context-maps/ContextMapsTabs";
import IRTabs from "@/components/irs/IRTabs";

const ProjectPage = () => {
  const { id: projectId } = useParams();
  const [importExportDialogUp, showImportExportDialog] =
    useState<FileOperation | null>(null);
  const [activeTab, setActive] = useState<string>(
    localStorage.getItem("activeTab") || "contextMaps"
  );

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  const { data: project, isLoading: projectLoading } = useProject(
    projectId || ""
  );

  const { data: sdgs, isLoading: sdgsLoading } = useProjectSDGs(
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
          <div>
            <h1 className="text-2xl font-semibold">{project?.name}</h1>
            <h2 className="text-md font-semibold">
              {project?.owner}/{project?.repository}
            </h2>
          </div>
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
            value="contextMaps"
            className={
              "py-2 px-4 rounded-l-md transition-all duration-200 focus:outline-none" +
              (activeTab === "contextMaps" ? " bg-gray-300" : "")
            }
          >
            Context Maps
          </TabsTrigger>
          <TabsTrigger
            value="sdgs"
            className={
              "py-2 px-4 transition-all duration-200 focus:outline-none" +
              (activeTab === "sdgs" ? " bg-gray-300" : "")
            }
          >
            Service Dependency Graphs
          </TabsTrigger>
          <TabsTrigger
            value="callgraphs"
            className={
              "py-2 px-4 transition-all duration-200 focus:outline-none" +
              (activeTab === "callgraphs" ? " bg-gray-300" : "")
            }
          >
            Call Graphs
          </TabsTrigger>
          <TabsTrigger
            value="irs"
            className={
              "py-2 px-4 rounded-r-md transition-all duration-200 focus:outline-none" +
              (activeTab === "irs" ? " bg-gray-300" : "")
            }
          >
            CIMET IRs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="contextMaps">
          <ContextMapsTabs projectId={projectId} />
        </TabsContent>

        <TabsContent value="sdgs">
          {sdgsLoading ? (
            <Loading overlay={false} />
          ) : (
            <SDGsTable columns={columns} data={sdgs!} projectId={projectId} />
          )}
        </TabsContent>

        <TabsContent value="callgraphs">
          <CallGraphsTabs projectId={projectId} />
        </TabsContent>

        <TabsContent value="irs">
          <IRTabs projectId={projectId} />
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
            activeTab === "contextMaps" && (
              <ContextMapCreateDialog
                projectId={projectId}
                closeDialog={() => showImportExportDialog(null)}
              />
            )}
          {importExportDialogUp == FileOperation.IMPORT &&
            activeTab === "sdgs" && (
              <SDGCreateDialog
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
                Context Maps:{" "}
                <span className="text-xl font-bold">
                  {projectSummary && projectSummary.totalContextMaps}
                </span>
              </p>
              <p className="">
                Context Map Analysis Outputs:{" "}
                <span className="text-xl font-bold">
                  {projectSummary && projectSummary.totalContextMapOutputs}
                </span>
              </p>
              <p className="">
                Service Dependency Graphs:{" "}
                <span className="text-xl font-bold">
                  {projectSummary && projectSummary.totalSdgs}
                </span>
              </p>
              <p>
                Call Graph Inputs:{" "}
                <span className="text-xl font-bold">
                  {projectSummary && projectSummary.totalCallGraphInputs}
                </span>
              </p>
              <p>
                Call Graph Analysis Outputs:{" "}
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
