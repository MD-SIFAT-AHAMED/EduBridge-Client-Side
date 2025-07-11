import React from "react";
import logo from "../../../assets/BannerImg/logo-removebg-preview.png";
import { Link } from "react-router";

const EduBridegeLogo = () => {
  return (
    <div>
      <Link
        to="/"
        className="text-xl md:text-2xl font-bold flex items-center gap-1"
      >
        <img src={logo} alt="logo" className="w-13 " />
        Edu<span className="text-primary">Bridge</span>
      </Link>
    </div>
  );
};

export default EduBridegeLogo;
