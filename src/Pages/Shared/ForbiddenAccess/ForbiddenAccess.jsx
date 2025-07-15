import { Link } from "react-router";
import { LuShieldAlert } from "react-icons/lu";
const ForbiddenAccess = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 px-4 text-center">
      <LuShieldAlert size={64} className="text-red-500 mb-4" />
      <h1 className="text-4xl font-bold text-error mb-2">403 - Forbidden</h1>
      <p className="text-base text-gray-500 mb-6">
        You don't have permission to access this page.
      </p>
      <Link to="/" className="btn btn-primary text-white">
        Go Back Home
      </Link>
    </div>
  );
};

export default ForbiddenAccess;
