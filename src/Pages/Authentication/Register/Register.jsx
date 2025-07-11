import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    console.log("Register Data:", data);

    // Access image file:
    const imageFile = data.image[0];
    console.log("Image file:", imageFile);
  };

  return (
    <div className="card-body">
      <h2 className="text-2xl md:text-4xl font-bold text-center mb-4">
        Register on EduBridge
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-3 **:focus:outline-none"
      >
        {/* Name Field */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Name</span>
          </label>
          <input
            type="text"
            placeholder="Enter your full name"
            className="input input-bordered w-full"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <span className="text-red-500 text-sm mt-1">
              {errors.name.message}
            </span>
          )}
        </div>

        {/* Image Upload */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Profile Photo</span>
          </label>
          <input
            type="file"
            className="file-input file-input-bordered w-full"
            accept="image/*"
            {...register("image", { required: "Image is required" })}
          />
          {errors.image && (
            <span className="text-red-500 text-sm mt-1">
              {errors.image.message}
            </span>
          )}
        </div>

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

        {/* Register Button */}
        <div className="form-control mt-4">
          <button type="submit" className="btn btn-primary w-full">
            Register
          </button>
        </div>
      </form>

      {/* Divider */}
      <div className="divider my-4">OR</div>

      {/* Login Link */}
      <p className="text-center text-sm">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500 font-medium hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
