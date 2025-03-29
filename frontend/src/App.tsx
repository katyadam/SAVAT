import { RouterProvider } from "react-router-dom";
import SidebarLayout from "./layouts/SidebarLayout";
import router from "./routes";
import { Toaster } from "./components/ui/toaster";
import { CallGraphLookupProvider } from "./context/CallGraphMethodLookupContext";
import { CGMethodReachProvider } from "./context/CallGraphMethodReachContext";

const ContextProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <CallGraphLookupProvider>
      <CGMethodReachProvider>{children}</CGMethodReachProvider>
    </CallGraphLookupProvider>
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
