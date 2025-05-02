import { RouterProvider } from "react-router-dom";
import SidebarLayout from "./layouts/SidebarLayout";
import router from "./routes";
import { Toaster } from "./components/ui/toaster";
import { CallGraphLookupProvider } from "./context/callGraph/CallGraphMethodLookupContext";
import { CGMethodReachProvider } from "./context/callGraph/CallGraphMethodReachContext";
import { SelectedIRFileProvider } from "./context/ir/SelectedIRFileContext";
import { IRMicroserviceLookupProvider } from "./context/ir/IRMicroserviceLookupContext";

const ContextProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <IRMicroserviceLookupProvider>
      <SelectedIRFileProvider>
        <CallGraphLookupProvider>
          <CGMethodReachProvider>{children}</CGMethodReachProvider>
        </CallGraphLookupProvider>
      </SelectedIRFileProvider>
    </IRMicroserviceLookupProvider>
  );
};

export default function App() {
  return (
    <ContextProviders>
      <SidebarLayout>
        <RouterProvider router={router} />
        <Toaster />
      </SidebarLayout>
    </ContextProviders>
  );
}
