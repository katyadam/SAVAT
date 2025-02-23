import { RouteObject } from "react-router-dom";
import ProjectLayout from "@/layouts/ProjectLayout";
import Error from "@/pages/Error";
import CallGraphOutputPage from "@/pages/CallGraphOutputPage";
import CallGraphPage from "@/pages/CallGraphPage";
import EntitiesPage from "@/pages/EntitiesPage";
import GraphPage from "@/pages/GraphPage";
import MethodsPage from "@/pages/MethodsPage";
import ProjectPage from "@/pages/ProjectPage";
import ErrorBoundary from "./ErrorBoundary";

const projectRoutes: RouteObject[] = [
  {
    path: "project/:id",
    Component: () => (
      <ErrorBoundary>
        <ProjectPage />
      </ErrorBoundary>
    ),
  },
  {
    path: "analysis-input/:id/entities",
    Component: () => (
      <ErrorBoundary>
        <EntitiesPage />
      </ErrorBoundary>
    ),
  },
  {
    path: "analysis-input/:id/graph",
    Component: () => (
      <ErrorBoundary>
        <GraphPage />
      </ErrorBoundary>
    ),
  },
  {
    path: "analysis-input/:id/methods",
    Component: () => (
      <ErrorBoundary>
        <MethodsPage />
      </ErrorBoundary>
    ),
  },
  {
    path: "call-graph-input/:id/methods",
    Component: () => (
      <ErrorBoundary>
        <MethodsPage />
      </ErrorBoundary>
    ),
  },
  {
    path: "call-graph-input/:id/call-graph",
    Component: () => (
      <ErrorBoundary>
        <CallGraphPage />
      </ErrorBoundary>
    ),
  },
  {
    path: "call-graph-output/:id/call-graph",
    Component: () => (
      <ErrorBoundary>
        <CallGraphOutputPage />
      </ErrorBoundary>
    ),
  },
];

const routes: RouteObject[] = [
  {
    path: "/",
    Component: () => (
      <ErrorBoundary>
        <ProjectLayout />
      </ErrorBoundary>
    ),
    children: projectRoutes,
  },
  {
    path: "*",
    Component: Error,
  },
];

export default routes;
