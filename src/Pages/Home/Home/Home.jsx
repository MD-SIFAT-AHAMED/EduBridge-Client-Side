import React from "react";
import Banner from "../Banner/Banner";
import PartnerSlider from "../PartnerSlider/PartnarSlider";
import TeacherInspiring from "../TeacherInspiring/TeacherInspiring";
import HowItWorks from "../HowItWorks/HowItWorks";
import WhyChooseUs from "../WhyChooseUs/WhyChooseUs";

const Home = () => {
  return (
    <div>
      <Banner />
      <PartnerSlider />
      <WhyChooseUs />
      <TeacherInspiring />
      <HowItWorks />
    </div>
  );
};

export default Home;
