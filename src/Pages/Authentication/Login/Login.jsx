import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import SignInGoogle from "../../Shared/SignInGoogle/SignInGoogle";
import useAuth from "../../../Hooks/useAuth";
import toast from "react-hot-toast";
const Login = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = (data) => {
    console.log(data);
    signIn(data.email, data.password)
      .then(() => {
        toast.success("Login Successfuly");
        navigate(location.state?.from || "/");
      })
      .catch((err) => {
        toast.error(err.code);
      });
    // Form value reset
    reset();
  };
  return (
    <div className="card-body">
      <h2 className="text-2xl md:text-4xl font-bold text-center mb-4">
        Login to EduBridge
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 **:focus:outline-none"
      >
        {/* Email Field */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Email</span>
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            className="input input-bordered w-full"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <span className="text-red-500 text-sm mt-1">
              {errors.email.message}
            </span>
          )}
        </div>

        {/* Password Field */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Password</span>
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="input input-bordered w-full pr-10"
              {...register("password", { required: "Password is required" })}
            />
            <span
              className="absolute right-3 z-10 top-3 text-xl cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {errors.password && (
            <span className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </span>
          )}
        </div>

        {/* Forgot Password Link */}
        <div className="text-right">
          <Link
            to="/forgotPassword"
            className="text-sm text-blue-500 hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        {/* Login Button */}
        <div className="form-control mt-4">
          <button type="submit" className="btn btn-primary w-full">
            Login
          </button>
        </div>
      </form>

      {/* Divider */}
      <div className="divider my-4">OR</div>

      {/* Register Link */}
      <p className="text-center text-sm">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="text-blue-500 font-medium hover:underline"
        >
          Register
        </Link>
      </p>
      <p className="place-items-center">
        <SignInGoogle />
      </p>
    </div>
  );
};

export default Login;
