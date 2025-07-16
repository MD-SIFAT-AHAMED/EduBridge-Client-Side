import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAuth from "../../../Hooks/useAuth";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AddClass = () => {
  const { user } = useAuth();
  const [imageUrl, setImageUrl] = useState("");
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handlerUploadImage = async (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image);
    const imgUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_Image_Upload_key
    }`;
    const res = await axios.post(imgUrl, formData);
    setImageUrl(res.data.data.url);
  };

  const addClassMutaion = useMutation({
    mutationFn: async (newClass) => {
      const res = await axiosSecure.post("/classes", newClass);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Class added successfully!");
      queryClient.invalidateQueries(["classes"]);
      setImageUrl("");
      navigate("/dashboard/teacher-classes");
      reset();
    },
    onError: () => {
      toast.error("Failed to add class");
    },
  });

  const onSubmit = async (data) => {
    const classData = {
      ...data,
      name: user?.displayName,
      email: user?.email,
      image: imageUrl,
      status: "pending",
      createAt: new Date().toISOString(),
    };
    addClassMutaion.mutate(classData);
  };

  return (
    <section className="px-4 py-10 min-h-screen bg-base-200">
      <div className="max-w-5xl mx-auto bg-base-100 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center divider">
          Add a New Class
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 **:focus:outline-none">
            {/* Title */}
            <div className="form-control">
              <label className="label">Title</label>
              <input
                type="text"
                {...register("title", { required: true })}
                placeholder="Enter Class Title"
                className="input input-bordered w-full"
              />
              {errors.title && (
                <span className="text-red-500 text-sm">Title is required</span>
              )}
            </div>

            {/* Name (read only) */}
            <div className="form-control">
              <label className="label">Instructor Name</label>
              <input
                type="text"
                readOnly
                defaultValue={user?.displayName}
                className="input input-bordered w-full"
              />
            </div>

            {/* Email (read only) */}
            <div className="form-control">
              <label className="label">Email</label>
              <input
                type="email"
                readOnly
                defaultValue={user?.email}
                className="input input-bordered w-full"
              />
            </div>

            {/* Price */}
            <div className="form-control">
              <label className="label">Price ($)</label>
              <input
                type="number"
                step="0.01"
                {...register("price", { valueAsNumber: true, required: true })}
                placeholder="Enter Price"
                className="input input-bordered w-full"
              />
              {errors.price && (
                <span className="text-red-500 text-sm">Price is required</span>
              )}
            </div>

            {/* Image File */}
            <div className="form-control md:col-span-2">
              <label className="label">Class Image</label>
              <input
                onChange={handlerUploadImage}
                type="file"
                accept="image/*"
                className="file-input file-input-bordered w-full"
              />
            </div>

            {/* Description */}
            <div className="form-control md:col-span-2">
              <label className="label">Description</label>
              <textarea
                {...register("description", { required: true })}
                placeholder="Write class details here"
                className="textarea textarea-bordered h-32 w-full"
              />
              {errors.description && (
                <span className="text-red-500 text-sm">
                  Description is required
                </span>
              )}
            </div>
          </div>

          {/* Submit */}
          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary w-full">
              Add Class
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddClass;
