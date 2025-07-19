import React from "react";
import Banner from "../Banner/Banner";
import PartnerSlider from "../PartnerSlider/PartnarSlider";
import TeacherInspiring from "../TeacherInspiring/TeacherInspiring";
import HowItWorks from "../HowItWorks/HowItWorks";
import WhyChooseUs from "../WhyChooseUs/WhyChooseUs";
import WebsiteStats from "../WebsiteStats/WebsiteStats";
import CommentSection from "../CommentSection/CommentSection ";
import PopularClasses from "../PopularClasses/PopularClasses";

const Home = () => {
  return (
    <div>
      <Banner />
      <PartnerSlider />
      <PopularClasses/>
      <WhyChooseUs />
      <TeacherInspiring />
      <CommentSection/>
      <WebsiteStats/>
      <HowItWorks />
    </div>
  );
};

export default Home;
