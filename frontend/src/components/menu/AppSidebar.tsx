import { ArrowRight, PlusCircle } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useProjects } from "@/hooks/useProject";
import { Project } from "@/api/projects/types";
import { Skeleton } from "../ui/skeleton";

type AppSidebarType = {
  openCreateProjectDialog: () => void;
};

export function AppSidebar({ openCreateProjectDialog }: AppSidebarType) {
  const { data: projects, isLoading, error } = useProjects();

  if (isLoading) return <Skeleton className="w-[300px] h-screen" />;
  if (error)
    return (
      <div>
        Error occured while loading projects. Please reload the windows.
      </div>
    );

  const handleNavigation = (projectId: number) => {
    localStorage.setItem("selectedProjectId", projectId.toString());
    window.location.href = `/project/${projectId}`;
  };

  return (
    <Sidebar className="flex" collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex justify-between items-center">
            <p>Projects</p>
            <button
              className="cursor-pointer"
              onClick={openCreateProjectDialog}
            >
              <PlusCircle size={32} />
            </button>
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-3">
            <SidebarMenu>
              {projects &&
                projects.map((project: Project) => (
                  <SidebarMenuItem key={project.id}>
                    <SidebarMenuButton
                      className={`flex justify-between ${
                        localStorage.getItem("selectedProjectId") ===
                          project.id.toString() && "font-bold bg-gray-200"
                      }`}
                      onClick={() => handleNavigation(project.id)}
                    >
                      <span>{project.name}</span>
                      <ArrowRight size={64} />
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
