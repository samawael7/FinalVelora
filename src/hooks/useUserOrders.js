import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const fetchUserOrders = async () => {
  const token = Cookies.get("authToken");
  if (!token) throw new Error("No auth token");
  try {
    const response = await axios.post(
      "https://localhost:7182/api/OrderS/myorders",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (
      response.data?.statusCode === 500 &&
      response.data?.data === null &&
      response.data?.message &&
      response.data?.success
    ) {
      return [];
    }
    if (response.data && Array.isArray(response.data.data)) {
      return response.data.data;
    }
    if (Array.isArray(response.data)) {
      return response.data;
    }
    throw new Error("Failed to fetch orders");
  } catch (err) {
    if (
      err.response?.data?.statusCode === 500 &&
      err.response?.data?.data === null &&
      err.response?.data?.message &&
      err.response?.data?.success
    ) {
      return [];
    }
    throw err;
  }
};

const useUserOrders = () => {
  return useQuery({
    queryKey: ["userOrders"],
    queryFn: fetchUserOrders,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
};

export default useUserOrders;
