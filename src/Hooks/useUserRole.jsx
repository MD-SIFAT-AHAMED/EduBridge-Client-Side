import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useUserRole = () => {
  const { user, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: role = null,
    isLoading: roleLoading,
    refetch,
  } = useQuery({
    queryKey: ["anc", user?.email],
    enabled: !authLoading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/info/${user.email}`);
      localStorage.setItem("role", res.data?.role);
      return res.data.role;
    },
  });

  return { role, roleLoading: roleLoading, refetch };
};

export default useUserRole;
