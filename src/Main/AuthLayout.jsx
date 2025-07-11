import robot from "../assets/LottieJson/robot.json";
import { Outlet } from "react-router";
import Lottie from "lottie-react";
import EduBridegeLogo from "../Pages/Shared/EduBridgeLogo/EduBridegeLogo";

const AuthLayout = () => {
  return (
    <div className="max-w-screen-2xl w-11/12 mx-auto my-auto max-h-screen">
      <div className="mt-2 md:mt-5 ">
        <EduBridegeLogo/>
      </div>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <Lottie className="w-100" animationData={robot} loop autoplay />
        </div>
        <div className="card bg-base-100 w-full max-w-md shrink-0 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
