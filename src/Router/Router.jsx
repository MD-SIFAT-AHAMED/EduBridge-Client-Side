import { createBrowserRouter } from "react-router";
import MainLayout from "../Main/MainLayout";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [],
  },
]);

export default router;
