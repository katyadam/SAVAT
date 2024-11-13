import ProjectLayout from "@/layouts/ProjectLayout";
import EntitiesPage from "@/pages/EntitiesPage";
import Error from "@/pages/Error";
import GraphPage from "@/pages/GraphPage";
import MethodsPage from "@/pages/MethodsPage";
import ProjectPage from "@/pages/ProjectPage";
import { RouteObject } from "react-router-dom";

const projectRoutes: RouteObject[] = [
  {
    path: ":id",
    Component: ProjectPage,
  },
  {
    path: ":id/entities",
    Component: EntitiesPage,
  },
  {
    path: ":id/graph",
    Component: GraphPage,
  },
  {
    path: ":id/methods",
    Component: MethodsPage,
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
