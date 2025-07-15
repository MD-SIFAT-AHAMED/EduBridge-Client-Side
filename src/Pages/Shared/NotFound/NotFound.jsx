import { Link } from "react-router";
import Lottie from "lottie-react";
import notFoundAnim from "../../../assets/LottieJson/Lonely 404.json";
const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 text-center px-4">
      <Lottie animationData={notFoundAnim} className="w-72 md:w-96 mb-6" />
      <h2 className="text-2xl md:text-4xl font-bold text-error mb-2">
        Oops! Page Not Found
      </h2>
      <p className="text-gray-500 mb-6">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="btn btn-primary">
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
