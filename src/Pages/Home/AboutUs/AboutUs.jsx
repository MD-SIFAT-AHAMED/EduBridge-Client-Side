import React from "react";
import about from "../../../assets/partnerLogo/about.jpg";
const AboutUs = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Page Header */}
      <h1 className="text-3xl font-bold text-center text-primary">
        About EduBridge
      </h1>
      <p className="text-center text-lg">
        Connecting Teachers and Students Worldwide
      </p>

      {/* About Section */}
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className=" mb-4">
            EduBridge is an innovative online learning platform designed to
            bring teachers and students together in a seamless, interactive
            environment. Our mission is to make quality education accessible to
            everyone, anywhere.
          </p>
          <p>
            Teachers can create and sell their courses, while students can
            explore, learn, and enhance their skills. EduBridge ensures a smooth
            experience for both instructors and learners with easy-to-use tools
            and secure transactions.
          </p>
        </div>

        <div>
          <img
            src={about}
            alt="EduBridge Learning"
            className="rounded-2xl shadow-lg w-full object-cover"
          />
        </div>
      </div>

      {/* How it Works */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">How EduBridge Works</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>For Teachers:</strong> Create and publish courses easily.
            Set pricing, upload lessons, and manage student enrollments
            effortlessly.
          </li>
          <li>
            <strong>For Students:</strong> Browse a wide range of courses,
            enroll, learn at your own pace, and track your progress.
          </li>
          <li>
            <strong>Secure Payments:</strong> EduBridge ensures safe and
            reliable payment options for both teachers and students.
          </li>
          <li>
            <strong>Community Support:</strong> Join discussions, share
            feedback, and connect with other learners.
          </li>
        </ul>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-8">
        <p className="text-lg mb-4">
          Ready to start your learning journey or teach your first course?
        </p>
        <button className="btn btn-primary btn-lg">Get Started</button>
      </div>
    </div>
  );
};

export default AboutUs;
