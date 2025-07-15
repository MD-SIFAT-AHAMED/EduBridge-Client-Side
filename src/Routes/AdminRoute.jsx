import React from "react";
import useAuth from "../Hooks/useAuth";
import useUserRole from "../Hooks/useUserRole";
import LoadingSpinner from "../Pages/Shared/LoadingSpinner/LoadingSpinner";
import { useNavigate } from "react-router";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useUserRole();
  const navigate = useNavigate();

  if (loading || roleLoading) {
    return <LoadingSpinner />;
  }

  if (!user || role !== "admin") {
    return navigate("forbiddenAccess");
  }

  return children;
};

export default AdminRoute;
