import { useProject } from "@/hooks/useProject";
import { useParams } from "react-router-dom";

const ProjectPage = () => {
  const { id } = useParams();
  const { data: project, isLoading, error } = useProject(id!);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <div>Error loading this project.</div>;
  return (
    <div>
      <div>
        <p>{project?.projectName}</p>
      </div>
    </div>
  );
};

export default ProjectPage;
