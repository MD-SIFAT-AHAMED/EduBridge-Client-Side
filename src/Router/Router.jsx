import { createBrowserRouter } from "react-router";
import MainLayout from "../Main/MainLayout";
import Home from "../Pages/Home/Home/Home";
import AuthLayout from "../Main/AuthLayout";
import Login from "../Pages/Authentication/Login/Login";
import Register from "../Pages/Authentication/Register/Register";
import ForgotPassword from "../Pages/Authentication/ForgotPassword/ForgotPassword";
import TeachOnEdu from "../Pages/TeachOnEdu/TeachOnEdu";
import PrivateRoute from "../Routes/PrivateRoute";
import NotFound from "../Pages/Shared/NotFound/NotFound";
import DashboardLayout from "../Main/DashboardLayout";
import MyProfile from "../Pages/Dashboard/MyProfile/MyProfile";
import TeacherRequest from "../Pages/Dashboard/TeacherRequest/TeacherRequest";
import Users from "../Pages/Dashboard/Users/Users";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "teachOnEdu",
        element: (
          <PrivateRoute>
            <TeachOnEdu />
          </PrivateRoute>
        ),
      },
    ],
  },

  // AuthLayout
  {
    path: "/",
    Component: AuthLayout,
    errorElement: <NotFound />,
    children: [
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/forgotPassword",
        Component: ForgotPassword,
      },
    ],
  },

  // DashboardLayout
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "profile",
        Component: MyProfile,
      },
      {
        path: "teacher-requests",
        element: <TeacherRequest />,
      },
      {
        path: "users",
        element: <Users />,
      },
    ],
  },
]);

export default router;
