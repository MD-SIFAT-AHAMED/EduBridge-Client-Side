import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import teacher from "../../assets/partnerLogo/teacherFrom.jpg";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import LoadingSpinner from "../Shared/LoadingSpinner/LoadingSpinner";
const TeachOnEdu = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const qureyClient = useQueryClient();

  const {
    data: dbUser = [],
    refetch,
    isPending,
  } = useQuery({
    queryKey: ["user", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/teacher/status/${user?.email}`);
      return res.data;
    },
  });

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await axiosSecure.patch(`/teacher/status/${user.email}`, {
        status: "pending",
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Request sent again!");
      qureyClient.invalidateQueries(["user"]);
    },
    onError: (error) => {
      toast.error("Failed to resend request");
      console.error(error);
    },
  });

  const onSubmit = (data) => {
    const formData = {
      ...data,
      name: user?.displayName,
      email: user?.email,
      photo: user?.photoURL,
      status: "pending",
      createAy: new Date().toISOString(),
    };

    axiosSecure.post("/teacher-requrests", formData).then((res) => {
      if (res.data.insertedId) {
        toast.success("Application Success");
        refetch();
      }
    });
    reset();
  };
  if (isPending) return <LoadingSpinner />;

  return (
    <section
      style={{ minHeight: "calc(100vh - 340px)" }}
      className="bg-base-100 flex justify-center items-center px-4 py-6"
    >
      {/* Already a Teacher */}
      {dbUser.status === "teacher" && (
        <div className="col-span-2 text-center">
          <p className="text-success text-2xl md:text-3xl lg:text-4xl font-bold">
            🎉 You’re already a teacher!
          </p>
          <p className="text-gray-500 mt-2 text-sm md:text-base">
            You can now create and manage your classes on EduBridge.
          </p>
        </div>
      )}

      {/* Application Pending */}
      {dbUser.status === "pending" && (
        <div className="col-span-2 text-center">
          <p className="text-info text-xl md:text-2xl font-semibold">
            ⏳ Your application is under review
          </p>
          <p className="text-gray-500 mt-2 text-sm md:text-base">
            Please wait while our team reviews your request.
          </p>
        </div>
      )}

      {/* Rejected — Show Request Again Button */}
      {dbUser.status === "rejected" && (
        <div className="col-span-2 text-center space-y-4">
          <p className="text-error text-xl md:text-2xl font-semibold">
            ❌ Your application was rejected
          </p>
          <p className="text-gray-500">
            You can improve your profile and re-apply to become an instructor.
          </p>
          <button
            onClick={() => mutation.mutate()}
            className="btn btn-warning text-white"
          >
            Request Again
          </button>
        </div>
      )}

      {!dbUser.status && (
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="bg-base-100 p-4 md:p-8 rounded-xl">
            <h2 className="text-2xl font-bold mb-6">Teach on EduBridge</h2>
            <figure>
              <img src={user?.photoURL} className="w-25 mb-5" alt="userPhoto" />
            </figure>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 **:focus:outline-none"
            >
              {/* Name */}
              <div className="form-control">
                <label className="label">Name</label>
                <input
                  type="text"
                  readOnly
                  defaultValue={user?.displayName}
                  className="input input-bordered w-full"
                />
              </div>

              {/* Email */}
              <div className="form-control">
                <label className="label">Email</label>
                <input
                  type="email"
                  readOnly
                  defaultValue={user?.email}
                  className="input input-bordered w-full"
                />
              </div>

              {/* Experience */}
              <div className="form-control">
                <label className="label">Experience Level</label>
                <select
                  {...register("experience", { required: true })}
                  className="select select-bordered w-full"
                >
                  <option value="">Select experience</option>
                  <option value="beginner">Beginner</option>
                  <option value="mid-level">Mid-Level</option>
                  <option value="experienced">Experienced</option>
                </select>
                {errors.experience && (
                  <span className="text-red-500 text-sm">
                    Experience is required
                  </span>
                )}
              </div>

              {/* Title */}
              <div className="form-control">
                <label className="label">Teaching Title</label>
                <input
                  type="text"
                  placeholder="e.g. Senior Web Developer"
                  {...register("title", { required: true })}
                  className="input input-bordered w-full"
                />
                {errors.title && (
                  <span className="text-red-500 text-sm">
                    Title is required
                  </span>
                )}
              </div>

              {/* Category */}
              <div className="form-control">
                <label className="label">Teaching Category</label>
                <select
                  {...register("category", { required: true })}
                  className="select select-bordered w-full"
                >
                  <option value="">Select a category</option>
                  <option value="web development">Web Development</option>
                  <option value="digital marketing">Digital Marketing</option>
                  <option value="ui ux design">UI/UX Design</option>
                  <option value="data science">Data Science</option>
                  <option value="business communication">
                    Business Communication
                  </option>
                </select>
                {errors.category && (
                  <span className="text-red-500 text-sm">
                    Category is required
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary w-full">
                  Submit Review
                </button>
              </div>
            </form>
          </div>

          {/* Image Side */}
          <div className="flex justify-center">
            <img
              src={teacher}
              alt="Teach on EduBridge"
              className="max-w-full lg:h-140"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default TeachOnEdu;
