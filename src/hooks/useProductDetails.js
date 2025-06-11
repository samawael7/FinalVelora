import api from "../api/axiosConfig";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

const fetchProductDetails = async (productId) => {
  try {
    if (!productId) {
      throw new Error("No product ID provided");
    }
    const response = await api.get(`/Products/${productId}`);
    return response.data;
  } catch (err) {
    console.error("API Error:", err);
    const errorMessage =
      err.response?.data?.message ||
      err.message ||
      "Failed to fetch product details";
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const useProductDetails = (productId) => {
  return useQuery({
    queryKey: ["productDetails", productId],
    queryFn: () => fetchProductDetails(productId),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
};

export default useProductDetails;
