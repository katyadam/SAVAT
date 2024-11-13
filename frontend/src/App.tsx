import { RouterProvider } from "react-router-dom";
import SidebarLayout from "./layouts/SidebarLayout";
import router from "./routes";

export default function App() {
  return (
    <SidebarLayout>
      <RouterProvider router={router} />
    </SidebarLayout>
  );
}
