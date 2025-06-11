import { useState } from "react";
import { productsEndpoints } from "../api/endpoints/products";
import api from "../api/axiosConfig";
import { toast } from "react-toastify";

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    pageIndex: 1,
    pageSize: 10,
    totalCount: 0,
  });

  const fetchProducts = async (options = {}) => {
    setLoading(true);
    try {
      const {
        concern,
        BestSeller,
        NewArrivals,
        skinType,
        productCategory,
        pageIndex = pagination.pageIndex,
        pageSize = pagination.pageSize,
      } = options;

      let url = productsEndpoints.getAll;

      if (BestSeller) {
        url = productsEndpoints.getBestSeller();
      } else if (NewArrivals) {
        url = productsEndpoints.getNewArrivals();
      } else if (concern) {
        url = productsEndpoints.getByConcern(concern);
      } else if (skinType) {
        url = productsEndpoints.getBySkinType(skinType);
      } else if (productCategory) {
        url = productsEndpoints.getByCategory(productCategory);
      } else if (pageIndex && pageSize) {
        url = productsEndpoints.getPaginated(pageIndex, pageSize);
      }

      const response = await api.get(url);
      setProducts(response.data.data);
      setPagination((prev) => ({
        ...prev,
        pageIndex,
        pageSize,
        totalCount: response.data.count || response.data.length,
      }));
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch products");
      toast.error(err.response?.data?.message || "Failed to fetch products");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPageIndex) => {
    if (
      newPageIndex > 0 &&
      newPageIndex <= Math.ceil(pagination.totalCount / pagination.pageSize)
    ) {
      fetchProducts({ pageIndex: newPageIndex });
    }
  };

  return {
    products,
    loading,
    error,
    pagination,
    fetchProducts,
    handlePageChange,
  };
};

export default useProducts;
