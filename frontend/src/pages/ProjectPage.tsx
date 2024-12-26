import { AnalysisInputsTable } from "@/components/inputs/AnalysisInputsTable";
import { columns } from "@/components/inputs/Columns";
import { useAnalysisInputs } from "@/hooks/useAnalysisInput";
import { useProject } from "@/hooks/useProject";
import { useParams } from "react-router-dom";

const ProjectPage = () => {
  const { id } = useParams();
  if (!id) return <p>Error invalid ID...</p>;

  const { data: project, isLoading: projectLoading } = useProject(id);
  const { data: inputs, isLoading: inputsLoading } = useAnalysisInputs(id);

  return (
    <div className="m-5">
      {projectLoading ? <p>Loading...</p> : <p>{project?.projectName}</p>}
      <div className="py-10">
        {inputsLoading ? (
          <p>Loading...</p>
        ) : (
          <AnalysisInputsTable columns={columns} data={inputs!} />
        )}
      </div>
    </div>
  );
};

export default ProjectPage;
