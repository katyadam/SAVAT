import { AnalysisInputsTable } from "@/components/inputs/AnalysisInputsTable";
import { columns } from "@/components/inputs/Columns";
import { useAnalysisInputs } from "@/hooks/useAnalysisInput";
import { useProject } from "@/hooks/useProject";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { useState } from "react";
import { useParams } from "react-router-dom";

const ProjectPage = () => {
  const { id } = useParams();
  const [activeTab, setActive] = useState<string>("components");
  if (!id) return <p>Error invalid ID...</p>;

  const { data: project, isLoading: projectLoading } = useProject(id);
  const { data: inputs, isLoading: inputsLoading } = useAnalysisInputs(id);

  return (
    <div className="m-5">
      {projectLoading ? (
        <p>Loading...</p>
      ) : (
        <h1 className="text-2xl font-semibold">{project?.projectName}</h1>
      )}

      <Tabs
        defaultValue="components"
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
            <p>Loading inputs...</p>
          ) : (
            <AnalysisInputsTable columns={columns} data={inputs!} />
          )}
        </TabsContent>

        <TabsContent value="callgraphs">
          <p>TODO: Callgraphs visualization</p>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectPage;
