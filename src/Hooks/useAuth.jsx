import React, { use } from "react";
import { AuthContex } from "../Context/AuthContext/AuthContext";

const useAuth = () => {
  const authInfo = use(AuthContex);
  return authInfo;
};

export default useAuth;
