import { DataTable } from "@/components/analysis-inputs/AnalysisInputsTable";
import { columns } from "@/components/analysis-inputs/Columns";
import { useAnalysisInputs } from "@/hooks/useAnalysisInput";
import { useProject } from "@/hooks/useProject";
import { useParams } from "react-router-dom";

const ProjectPage = () => {
  const { id } = useParams();
  if (!id) return <p>Error invalid ID...</p>;

  const { data: project, isLoading: projectLoading } = useProject(id);
  const { data: inputs, isLoading: inputsLoading } = useAnalysisInputs(id);

  return (
    <div>
      <p>{projectLoading ? <p>Loading...</p> : project?.projectName}</p>
      <div className="container mx-auto py-10">
        {inputsLoading ? (
          <p>Loading...</p>
        ) : (
          <DataTable columns={columns} data={inputs!} />
        )}
      </div>
    </div>
  );
};

export default ProjectPage;
