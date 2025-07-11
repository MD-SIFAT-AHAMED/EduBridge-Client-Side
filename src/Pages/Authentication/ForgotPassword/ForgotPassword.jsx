import { useForm } from "react-hook-form";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Forgot password request:", data.email);
    // You can send a password reset email via backend/Firebase here
  };

  return (
    <div className="card-body">
      <h2 className="text-2xl font-bold text-center mb-4">Forgot Password</h2>
      <p className="text-sm text-center text-gray-500 mb-6">
        Enter your registered email to reset your password.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email Field */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Email</span>
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            className="input input-bordered w-full focus:outline-none"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <span className="text-red-500 text-sm mt-1">
              {errors.email.message}
            </span>
          )}
        </div>

        {/* Submit Button */}
        <div className="form-control mt-4">
          <button type="submit" className="btn btn-primary w-full">
            Send Reset Link
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
