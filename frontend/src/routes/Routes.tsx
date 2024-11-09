import ProjectLayout from "@/layouts/ProjectLayout";
import Error from "@/pages/Error";
import ProjectPage from "@/pages/ProjectPage";
import { RouteObject } from "react-router-dom";

const projectRoutes: RouteObject[] = [
  {
    path: ":id",
    Component: ProjectPage,
  },
];

const routes: RouteObject[] = [
  {
    path: "/",
    Component: ProjectLayout,
    children: projectRoutes,
  },
  {
    path: "*",
    Component: Error,
  },
];

export default routes;
