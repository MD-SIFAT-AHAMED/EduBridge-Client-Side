import { FaEnvelope, FaPhone, FaPhoneAlt, FaUserTag } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";

const MyProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch additional info like phone, role, etc.
  const { data: dbUser = {} } = useQuery({
    queryKey: ["user", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/info/${user?.email}`);
      return res.data;
    },
  });

  return (
    <section className="min-h-screen bg-primary/10 flex justify-center items-center px-4 py-12">
      <div className="max-w-2xl w-full glass bg-white bg-opacity-70 rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
        {/* Gradient Header */}
        <div className="bg-primary/80 p-6 text-white text-center rounded-t-3xl">
          <div className="avatar mb-3">
            <div className="w-28 h-28 rounded-full ring-4 ring-white mx-auto overflow-hidden">
              <img src={user?.photoURL} alt="User Avatar" />
            </div>
          </div>
          <h2 className="text-2xl font-bold">{user?.displayName}</h2>
          <p className="flex justify-center items-center gap-2 text-sm opacity-90">
            <FaUserTag className="text-white" /> {dbUser?.role || "Student"}
          </p>
        </div>

        {/* Info Section */}
        <div className="p-6 space-y-4 text-gray-700">
          <div className="flex items-center gap-3">
            <FaEnvelope className="text-primary" />
            <span className="font-medium">Email:</span>
            <span>{user?.email}</span>
          </div>

          <div className="flex items-center gap-3">
            <FaPhoneAlt className="text-primary" />
            <span className="font-medium">Phone:</span>
            <span>{dbUser?.phone || "Not provided"}</span>
          </div>

          {/* Optional Button */}
          {/* <div className="text-right pt-4">
            <button className="btn btn-outline btn-primary">Edit Profile</button>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default MyProfile;
