import loadingAnim from "../../../assets/LottieJson/Loading Dots.json";
import Lottie from "lottie-react";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Lottie animationData={loadingAnim} className={`w-50`} />
    </div>
  );
};

export default LoadingSpinner;
