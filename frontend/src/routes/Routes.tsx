import ProjectLayout from "@/layouts/ProjectLayout";
import CallGraphOutputPage from "@/pages/CallGraphOutputPage";
import CallGraphPage from "@/pages/CallGraphPage";
import EntitiesPage from "@/pages/EntitiesPage";
import Error from "@/pages/Error";
import GraphPage from "@/pages/GraphPage";
import MethodsPage from "@/pages/MethodsPage";
import ProjectPage from "@/pages/ProjectPage";
import { RouteObject } from "react-router-dom";

const projectRoutes: RouteObject[] = [
  {
    path: "project/:id",
    Component: ProjectPage,
  },
  {
    path: "analysis-input/:id/entities",
    Component: EntitiesPage,
  },
  {
    path: "analysis-input/:id/graph",
    Component: GraphPage,
  },
  {
    path: "analysis-input/:id/methods",
    Component: MethodsPage,
  },
  {
    path: "call-graph-input/:id/methods",
    Component: MethodsPage,
  },
  {
    path: "call-graph-input/:id/call-graph",
    Component: CallGraphPage,
  },
  {
    path: "call-graph-output/:id/call-graph",
    Component: CallGraphOutputPage,
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
