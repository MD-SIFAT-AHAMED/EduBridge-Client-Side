import loadingAnim from "../../../assets/LottieJson/Loading Dots.json";
import Lottie from "lottie-react";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center min-h-[200px]">
      <Lottie animationData={loadingAnim} className={`w-50`} />
    </div>
  );
};

export default LoadingSpinner;
