import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import teacher from "../../assets/partnerLogo/teacherFrom.jpg";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
const TeachOnEdu = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const onSubmit = (data) => {
    const formData = {
      ...data,
      name: user?.displayName,
      email: user?.email,
      photo: user?.photoURL,
      status: "pending",
      createAy: new Date().toISOString(),
    };
    console.log("Submitted Data:", formData);
    axiosSecure.post("/teacher-requrests", formData).then((res) => {
      if (res.data.insertedId) {
        toast.success("Application Success");
      }
    });
    reset();
  };

  return (
    <section className="min-h-screen bg-base-200 px-4 py-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Form Side */}
        <div className="bg-base-100 p-8 rounded-xl">
          <h2 className="text-2xl font-bold mb-6">Teach on EduBridge</h2>
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
                <span className="text-red-500 text-sm">Title is required</span>
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
    </section>
  );
};

export default TeachOnEdu;
