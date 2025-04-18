import { RouteObject } from "react-router-dom";
import ProjectLayout from "@/layouts/ProjectLayout";
import Error from "@/pages/Error";
import CallGraphOutputPage from "@/pages/CallGraphOutputPage";
import CallGraphPage from "@/pages/CallGraphPage";
import ContextMapPage from "@/pages/ContextMapPage";
import SDGPage from "@/pages/SDGPage";
import MethodsPage from "@/pages/MethodsPage";
import ProjectPage from "@/pages/ProjectPage";
import ErrorBoundary from "./ErrorBoundary";
import ContextMapOutputPage from "@/pages/ContextMapOutputPage";
import IRPage from "@/pages/IRPage";

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
    path: "context-maps/:id",
    Component: () => (
      <ErrorBoundary>
        <ContextMapPage />
      </ErrorBoundary>
    ),
  },
  {
    path: "sdg/:id",
    Component: () => (
      <ErrorBoundary>
        <SDGPage />
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
  {
    path: "context-map-output/:id/context-map",
    Component: () => (
      <ErrorBoundary>
        <ContextMapOutputPage />
      </ErrorBoundary>
    ),
  },
  {
    path: "ir/:irFile",
    Component: () => (
      <ErrorBoundary>
        <IRPage />
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
