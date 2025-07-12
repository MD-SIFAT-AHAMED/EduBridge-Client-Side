import React from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router";
import useAuth from "../../../Hooks/useAuth";

const SignInGoogle = () => {
  const { loginWithGoggle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handlerLoginWithGoogle = () => {
    loginWithGoggle()
      .then(async (result) => {
        const user = result.user;
        // Update userInfo in the database
        const userInfo = {
          email: user.email,
          role: "user", //default role
          create_at: new Date().toISOString(),
          last_log_in: new Date().toISOString(),
        };
        // const userRes = await axiosInstance.post("/users", userInfo);

        toast.success("Login Successfuly");
        navigate(location.state?.from || "/");
      })
      .catch((err) => {
        toast.error(err.code);
      });
  };
  return (
    <div>
      <button
        onClick={handlerLoginWithGoogle}
        className="flex items-center btn btn-ghost font-medium"
      >
        <FcGoogle size={20} />
        Sign in With Google
      </button>
    </div>
  );
};

export default SignInGoogle;
