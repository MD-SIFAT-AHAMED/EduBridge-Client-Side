import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import SignInGoogle from "../../Shared/SignInGoogle/SignInGoogle";
import axios from "axios";
import useAuth from "../../../Hooks/useAuth";
import toast from "react-hot-toast";
import useAxios from "../../../Hooks/useAxios";

const Register = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [profieImg, setProfileImg] = useState("");
  const { createUser, updateUserData } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosInstance = useAxios();


  // upload image to ImgBB
  const uploadImageImgBB = async (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image);
    const imgUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_Image_Upload_key
    }`;
    const res = await axios.post(imgUrl, formData);
    setProfileImg(res.data.data.url);
  };

  const onSubmit = (data) => {
    const userData = {
      displayName: data.name,
      photoURL: profieImg,
    };
    console.log(userData);

    const userInfo = {
      name: data.name,
      email: data.email,
      role: "student", //default role
      photo: profieImg,
      create_at: new Date().toISOString(),
      last_log_in: new Date().toISOString(),
    };
    createUser(data.email, data.password)
      .then(() => {
        updateUserData(userData)
          .then(async () => {
            await axiosInstance.post("/users", userInfo);
            toast.success("Register Successfuly");
            navigate(location.state?.from || "/");
          })
          .catch((err) => {
            toast.error(err);
          });
      })
      .catch((err) => {
        toast.error(err);
      });
    reset();
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
            onChange={uploadImageImgBB}
            className="file-input file-input-bordered w-full"
            accept="image/*"
          />
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
      <div className="place-items-center">
        <SignInGoogle />
      </div>
    </div>
  );
};

export default Register;
