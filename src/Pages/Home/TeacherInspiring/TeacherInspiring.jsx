import React from "react";
import teacher from "../../../assets/partnerLogo/teacher.jpg";
import { Link } from "react-router";
const TeacherInspiring = () => {
  return (
    <div className="hero bg-base-100 px-4 md:px-10">
      <div className="hero-content flex-col lg:flex-row gap-10">
        {/* Left - Image */}
        <img
          src={teacher}
          className="max-w-xs md:max-w-sm lg:max-w-md rounded-lg shadow-xl object-cover"
          alt="Inspiring Teacher"
        />

        {/* Right - Text Content */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Become an Instructor
          </h1>
          <p className="py-2 text-base md:text-lg text-gray-600 leading-relaxed">
            Share your knowledge with thousands of eager learners. At EduBridge,
            we empower passionate educators to create impactful learning
            experiences. Join our platform and inspire the next generation.
          </p>
          <Link to={'/teachOnEdu'}>
            <button className="btn btn-primary mt-4">
              Start Teaching Today
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TeacherInspiring;
