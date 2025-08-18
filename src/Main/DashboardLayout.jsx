import { Link, Outlet, useNavigate } from "react-router";
import { FaBars, FaRegChartBar, FaSignOutAlt } from "react-icons/fa";
import EduBridegeLogo from "../Pages/Shared/EduBridgeLogo/EduBridegeLogo";
import { NavLink } from "react-router";
import {
  FaHome,
  FaUser,
  FaBook,
  FaPlus,
  FaChalkboardTeacher,
  FaUsers,
  FaClipboardList,
} from "react-icons/fa";
import useUserRole from "../Hooks/useUserRole";
import LoadingSpinner from "../Pages/Shared/LoadingSpinner/LoadingSpinner";
import toast from "react-hot-toast";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import useAuth from "../Hooks/useAuth";

const DashboardLayout = () => {
  const { role, roleLoading } = useUserRole();
  const { logOut } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  if (roleLoading) {
    return <LoadingSpinner />;
  }

  const handleLogout = () => {
    logOut()
      .then(() => {
        queryClient.removeQueries();
        toast.success("Logout Success");
        localStorage.removeItem("token");
        navigate("/index");
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  return (
    <div className="drawer lg:drawer-open inter-font">
      {/* Drawer Toggle for Small Devices */}
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col">
        {/* Header */}
        <div className="w-full bg-primary/60 p-4 flex items-center ">
          {/* Drawer Toggle Button */}
          <label
            htmlFor="dashboard-drawer"
            className="p-3 bg-primary/0 text-white mr-2  lg:hidden"
          >
            <FaBars size={20} />
          </label>

          {/* Logo and Name */}
          <span className="text-2xl text-white font-medium">Dashboard</span>
        </div>

        {/*  Main Content (Outlet) */}
        <div className="p-">
          <Outlet />
        </div>
      </div>

      {/* Sidebar (Drawer Side) */}
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

        <ul className="menu p-4 w-64 min-h-full bg-base-100 text-base-content space-y-2">
          {/* Sidebar Links */}
          <div>
            <EduBridegeLogo />
          </div>

          {/* <li>
            <NavLink to="/dashboard">
              <FaHome className="mr-2" />
              Dashboard Home
            </NavLink>
          </li> */}

          <li>
            <NavLink to="/">
              <FaHome className="mr-2" />
              Back to Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/overview">
              <FaRegChartBar className="mr-2" />
              Overview
            </NavLink>
          </li>

          {/* Student Links */}
          {!roleLoading && role === "student" && (
            <>
              <li>
                <NavLink to="/dashboard/enrolled-classes">
                  <FaBook className="mr-2" />
                  My Enroll Class
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/my-payment">
                  <FaBook className="mr-2" />
                  My Payment
                </NavLink>
              </li>
            </>
          )}

          {/* Teacher Links */}
          {!roleLoading && role === "teacher" && (
            <>
              <li>
                <NavLink to="/dashboard/add-class">
                  <FaPlus className="mr-2" />
                  Add Class
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/teacher-classes">
                  <FaClipboardList className="mr-2" />
                  My Classes
                </NavLink>
              </li>
            </>
          )}

          {/* Admin Links */}
          {!roleLoading && role === "admin" && (
            <>
              <li>
                <NavLink to="/dashboard/teacher-requests">
                  <FaChalkboardTeacher className="mr-2" />
                  Teacher Request
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/users">
                  <FaUsers className="mr-2" />
                  All Users
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/all-classes">
                  <FaBook className="mr-2" />
                  All Classes
                </NavLink>
              </li>
            </>
          )}

          {/* Common */}
          <li>
            <NavLink to="/dashboard/profile">
              <FaUser className="mr-2" />
              My Profile
            </NavLink>
          </li>
          <li>
            <button onClick={handleLogout} className="text-red-600">
              <FaSignOutAlt className="mr-2" />
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
