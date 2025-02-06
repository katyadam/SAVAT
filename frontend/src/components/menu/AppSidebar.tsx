import { ArrowRight } from "lucide-react";

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
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

export function AppSidebar() {
  const { data: projects, isLoading, error } = useProjects();

  if (isLoading) return <Skeleton className="w-[300px] h-screen" />;
  if (error) return <div>Error loading projects.</div>;

  const handleNavigation = (projectId: number) => {
    localStorage.setItem("selectedProjectId", projectId.toString());
    window.location.href = `/project/${projectId}`;
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Projects</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {projects?.map((project: Project) => (
                <SidebarMenuItem key={project.id}>
                  <SidebarMenuButton asChild>
                    <Button
                      className={`flex justify-between ${
                        localStorage.getItem("selectedProjectId") ===
                          project.id.toString() && "font-bold bg-gray-200"
                      }`}
                      onClick={() => handleNavigation(project.id)}
                      variant={"ghost"}
                    >
                      <span>{project.projectName}</span>
                      <ArrowRight size={64} />
                    </Button>
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
