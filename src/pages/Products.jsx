import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useProducts from "../hooks/useProducts";
import { Container, Row, Col, Button, Badge } from "react-bootstrap";
import { FaShoppingCart, FaStar, FaRegStar, FaEye } from "react-icons/fa";
import { toast } from "react-toastify";
import { useCart } from "../Contexts/CartContext";
import { motion } from "framer-motion";

const Products = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const { addToCart, cart } = useCart();

  const {
    products,
    loading,
    error,
    pagination,
    fetchProducts,
    handlePageChange,
  } = useProducts();

  const activeFilters = {
    concern: searchParams.get("concern"),
    BestSeller: searchParams.get("BestSeller") === "true",
    NewArrivals: searchParams.get("NewArrivals") === "true",
    skinType: searchParams.get("skinType"),
    productCategory: searchParams.get("productCategory"),
  };

  useEffect(() => {
    fetchProducts(activeFilters);
  }, [location.search]);

  if (loading) {
    return (
      <div className="w-100 py-5 d-flex justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-danger py-5">
        <p>{error}</p>
        <Button variant="primary" onClick={() => fetchProducts(activeFilters)}>
          Retry
        </Button>
      </div>
    );
  }

  const getPageTitle = () => {
    if (activeFilters.concern) return `${activeFilters.concern} Products`;
    if (activeFilters.BestSeller) return "Best Sellers";
    if (activeFilters.NewArrivals) return "New Arrivals";
    if (activeFilters.skinType)
      return `${activeFilters.skinType} Skin Products`;
    if (activeFilters.productCategory)
      return `${activeFilters.productCategory}`;
    return "Featured Products";
  };

  const isInCart = (productId) => {
    return cart.some((item) => item.id === productId);
  };

  return (
    <Container className="py-5">
      <h2 className="text-center mb-5">{getPageTitle()}</h2>

      <Row className="g-4">
        {products.map((product) => (
          <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
            <motion.div
              whileHover={{ y: -5 }}
              className="product-card h-100 d-flex flex-column border rounded overflow-hidden shadow-sm"
            >
              <div className="position-relative">
                <img
                  src={product.pictureUrl}
                  alt={product.name}
                  className="img-fluid w-100"
                  style={{ height: "250px", objectFit: "cover" }}
                />
                {product.isBestSeller && (
                  <Badge
                    bg="warning"
                    className="position-absolute top-0 start-0 m-2"
                  >
                    Bestseller
                  </Badge>
                )}
                <Badge
                  bg="secondary"
                  className="position-absolute top-0 end-0 m-2"
                >
                  {product.productCategory}
                </Badge>
              </div>

              <div className="p-3 d-flex flex-column flex-grow-1">
                <div className="mb-2">
                  {product.productBrand && (
                    <Badge bg="secondary" className="me-2">
                      {product.productBrand}
                    </Badge>
                  )}
                  <Badge bg="secondary">{product.skinType}</Badge>
                  {product.concern && (
                    <Badge bg="light" text="dark" className="ms-2">
                      {product.concern}
                    </Badge>
                  )}
                </div>

                <h3 className="h5 mb-2">{product.name}</h3>
                <p className="small text-muted flex-grow-1">
                  {product.description}
                </p>

                <div className="d-flex justify-content-between align-items-center mt-2">
                  <div>
                    <span className="fw-bold" style={{ color: "#7f6fff" }}>
                      {product.price} EGP
                    </span>
                    <div className="text-warning">
                      {[...Array(5)].map((_, i) =>
                        product.salesCount > i * 100 ? (
                          <FaStar key={i} />
                        ) : (
                          <FaRegStar key={i} />
                        )
                      )}
                      <span className="ms-1 text-dark small">
                        ({product.salesCount})
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => navigate(`/products/${product.id}`)}
                  >
                    <FaEye className="me-1" /> View
                  </Button>
                </div>

                <div className="mt-auto">
                  <Button
                    variant={isInCart(product.id) ? "success" : "primary"}
                    size="sm"
                    onClick={() => {
                      addToCart(product);
                      toast.success(`Added to cart!`);
                    }}
                    className="w-100 mt-2"
                  >
                    <FaShoppingCart className="me-1" />
                    {isInCart(product.id) ? "Added to Cart" : "Add to Cart"}
                  </Button>
                </div>
              </div>
            </motion.div>
          </Col>
        ))}
      </Row>

      {!activeFilters.concern &&
        !activeFilters.BestSeller &&
        !activeFilters.NewArrivals &&
        !activeFilters.skinType &&
        !activeFilters.productCategory && (
          <div className="d-flex justify-content-center mt-5">
            <Button
              variant="outline-secondary"
              className="mx-2"
              onClick={() => handlePageChange(pagination.pageIndex - 1)}
              disabled={pagination.pageIndex === 1}
            >
              Previous
            </Button>
            <span className="mx-2 d-flex align-items-center">
              Page {pagination.pageIndex} of{" "}
              {Math.ceil(pagination.totalCount / pagination.pageSize)}
            </span>
            <Button
              variant="outline-secondary"
              className="mx-2"
              onClick={() => handlePageChange(pagination.pageIndex + 1)}
              disabled={
                pagination.pageIndex ===
                Math.ceil(pagination.totalCount / pagination.pageSize)
              }
            >
              Next
            </Button>
          </div>
        )}
    </Container>
  );
};

export default Products;
