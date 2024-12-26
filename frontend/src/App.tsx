import { RouterProvider } from "react-router-dom";
import SidebarLayout from "./layouts/SidebarLayout";
import router from "./routes";
import { Toaster } from "./components/ui/toaster";

export default function App() {
  return (
    <SidebarLayout>
      <RouterProvider router={router} />
      <Toaster />
    </SidebarLayout>
  );
}
