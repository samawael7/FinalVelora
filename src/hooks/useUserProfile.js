import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const fetchUserProfile = async () => {
  const token = Cookies.get("authToken");
  if (!token) throw new Error("No auth token");
  const { data } = await axios.get("https://localhost:7182/api/User/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

const useUserProfile = () => {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: fetchUserProfile,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
};

export default useUserProfile;
