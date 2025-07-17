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
import ForbiddenAccess from "../Pages/Shared/ForbiddenAccess/ForbiddenAccess";
import AdminRoute from "../Routes/AdminRoute";
import TeacherRoute from "../Routes/TeacherRoute";
import AddClass from "../Pages/Dashboard/AddClass/AddClass";
import TeacherClasses from "../Pages/Dashboard/TeacherClasses/TeacherClasses";
import AllClasses from "../Pages/Dashboard/AllClasses/AllClasses";
import Classes from "../Pages/Classes/Classes/Classes";
import ClassesDetails from "../Pages/Classes/ClassesDetails/ClassesDetails";
import Payment from "../Pages/Payment/Payment/Payment";
import EnrollClasses from "../Pages/Dashboard/EnrollClasses/EnrollClasses";
import EnrollClassDetails from "../Pages/Dashboard/EnrollClassDetails/EnrollClassDetails";

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
        path: "classes",
        Component: Classes,
      },
      {
        path: "classes-details/:id",
        element: (
          <PrivateRoute>
            <ClassesDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "teachOnEdu",
        element: (
          <PrivateRoute>
            <TeachOnEdu />
          </PrivateRoute>
        ),
      },
      {
        path: "payment/:id",
        element: (
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        ),
      },
      {
        path: "forbiddenAccess",
        Component: ForbiddenAccess,
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
      // Common
      {
        path: "profile",
        Component: MyProfile,
      },
      // Student Routes
      {
        path: "enrolled-classes",
        element: (
          <PrivateRoute>
            <EnrollClasses />
          </PrivateRoute>
        ),
      },
      {
        path: "enrolled-classes-details/:id",
        element: (
          <PrivateRoute>
            <EnrollClassDetails />
          </PrivateRoute>
        ),
      },

      // Teacher Routes
      {
        path: "add-class",
        element: (
          <TeacherRoute>
            <AddClass />
          </TeacherRoute>
        ),
      },
      {
        path: "teacher-classes",
        element: (
          <TeacherRoute>
            <TeacherClasses />
          </TeacherRoute>
        ),
      },

      // Admin Routes
      {
        path: "teacher-requests",
        element: (
          <AdminRoute>
            <TeacherRequest />
          </AdminRoute>
        ),
      },
      {
        path: "users",
        element: (
          <AdminRoute>
            <Users />
          </AdminRoute>
        ),
      },
      {
        path: "all-classes",
        element: (
          <AdminRoute>
            <AllClasses />
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
