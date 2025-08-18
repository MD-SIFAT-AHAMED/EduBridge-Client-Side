import { Link, NavLink, useNavigate } from "react-router";
import { FaHome, FaChalkboardTeacher, FaBookOpen } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import EduBridegeLogo from "../EduBridgeLogo/EduBridegeLogo";
import useAuth from "../../../Hooks/useAuth";
import toast from "react-hot-toast";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { useQueryClient } from "@tanstack/react-query";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

const Navbar = () => {
  const { user, loading, logOut } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    logOut()
      .then(() => {
        navigate("/");
        queryClient.removeQueries();
        toast.success("Logout Success");
        localStorage.removeItem("token");
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  const navLinks = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `flex gap-1 items-center font-semibold text-base ${
            isActive ? "text-primary" : ""
          } `
        }
      >
        <FaHome className="mr-1" /> Home
      </NavLink>
      <NavLink
        to="/classes"
        className={({ isActive }) =>
          ` flex gap-1 items-center font-semibold text-base ${
            isActive ? "text-primary" : ""
          } `
        }
      >
        <FaBookOpen className="mr-1" /> All Classes
      </NavLink>
      <NavLink
        to="/teachOnEdu"
        className={({ isActive }) =>
          `flex gap-1 items-center font-semibold text-base ${
            isActive ? "text-primary" : ""
          } `
        }
      >
        <FaChalkboardTeacher className="mr-1" /> Teach on EduBridge
      </NavLink>
    </>
  );

  return (
    <div className="navbar bg-base-100 px-4 rounded-xl ">
      {/* Left - Logo */}
      <div className="navbar-start">
        <EduBridegeLogo />
      </div>

      {/* Center - Nav Links */}
      {!loading && (
        <div className="navbar-center hidden lg:flex">
          <div className="flex gap-6">{navLinks}</div>
        </div>
      )}

      {/* Right - Auth Buttons or User */}
      {!loading && (
        <div className="navbar-end ">
          <div className="pr-3">
            <ThemeToggle />
          </div>
          {!user ? (
            <div className="flex gap-2">
              <Link
                to="/register"
                className="btn rounded-xl btn-primary btn-outline"
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="btn rounded-xl hidden lg:flex  btn-primary"
              >
                Log In
              </Link>
            </div>
          ) : (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    src={user.photoURL || <FaUserCircle />}
                    alt="User"
                    className="object-cover"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[999] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <p className="font-bold">{user.displayName}</p>
                </li>
                <li>
                  <Link to="/dashboard/overview">Dashboard</Link>
                </li>

                <li>
                  <button onClick={handleLogout} className="text-red-600">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Mobile Nav (Hamburger Menu) */}
      <div className="drawer w-fit navbar-end lg:hidden">
        <input id="mobile-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex items-center justify-between p-2">
          {/* Hamburger button (left side) */}
          <label htmlFor="mobile-drawer" className="p-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>

          {/* Add other right-side nav items here if needed */}
        </div>

        <div className="drawer-side z-10">
          <label htmlFor="mobile-drawer" className="drawer-overlay"></label>

          <ul className="menu *:justify-start w-3/5  min-h-full bg-base-100 gap-3 p-6 text-base-content">
            {/* Sidebar content here */}

            <EduBridegeLogo />
            {navLinks}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
