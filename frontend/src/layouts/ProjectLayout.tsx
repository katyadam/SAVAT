import ReturnButton from "@/components/ui/return-button";
import { Outlet } from "react-router-dom";

const ProjectLayout = () => {
  return (
    <>
      <ReturnButton />
      <Outlet />
    </>
  );
};

export default ProjectLayout;
