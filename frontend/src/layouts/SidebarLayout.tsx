import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "../components/menu/AppSidebar";
import { useState } from "react";
import Overlay from "@/components/ui/Overlay";
import CreateProjectDialog from "@/components/projects/CreateProjectDialog";

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [createProjectDialogOpened, openCreateProjectDialog] =
    useState<boolean>(false);

  return (
    <SidebarProvider>
      <AppSidebar
        openCreateProjectDialog={() => openCreateProjectDialog(true)}
      />
      <main className="w-full">
        <SidebarTrigger />
        {children}
        {createProjectDialogOpened && (
          <Overlay
            closeFunc={() => openCreateProjectDialog(false)}
            width="500px"
          >
            <CreateProjectDialog
              closeDialog={() => openCreateProjectDialog(false)}
            />
          </Overlay>
        )}
      </main>
    </SidebarProvider>
  );
}
