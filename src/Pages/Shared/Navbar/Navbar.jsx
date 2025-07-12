import { Link, NavLink } from "react-router";
import { FaHome, FaChalkboardTeacher, FaBookOpen } from "react-icons/fa";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import EduBridegeLogo from "../EduBridgeLogo/EduBridegeLogo";
const Navbar = () => {
 
  const [user, setUser] = useState(
  // {
  //     name: "MD SIFAT AHAMED",
  //     email: "user@example.com",
  //     photo: "https://i.pravatar.cc/150?img=12", // fallback image
  //   });
  )
  const handleLogout = () => {
    console.log("Logging out...");
    setUser(null);
  };

  const navLinks = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `btn btn-ghost text-base ${isActive ? "text-primary" : ""} `
        }
      >
        <FaHome className="mr-1" /> Home
      </NavLink>
      <NavLink
        to="/classes"
        className={({ isActive }) =>
          `btn btn-ghost text-base ${isActive ? "text-primary" : ""} `
        }
      >
        <FaBookOpen className="mr-1" /> All Classes
      </NavLink>
      <NavLink
        to="/teach"
        className={({ isActive }) =>
          `btn btn-ghost text-base ${isActive ? "text-primary" : ""} `
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
      <div className="navbar-center hidden lg:flex">
        <div className="flex gap-2">{navLinks}</div>
      </div>

      {/* Right - Auth Buttons or User */}
      <div className="navbar-end ">
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
                  src={user.photo || <FaUserCircle />}
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
                <p className="font-bold">{user.name}</p>
              </li>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Mobile Nav (Hamburger Menu) */}
      <div className="drawer w-fit navbar-end lg:hidden">
        <input id="mobile-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex items-center justify-between p-2">
          {/* Hamburger button (left side) */}
          <label htmlFor="mobile-drawer" className="btn">
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
          <ul className="menu *:justify-start p-4 w-2/3 min-h-full bg-base-100 text-base-content">
            {/* Sidebar content here */}
            {navLinks}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
