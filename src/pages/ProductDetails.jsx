import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Badge,
  Card,
  Spinner,
  Alert,
} from "react-bootstrap";
import {
  FaShoppingCart,
  FaStar,
  FaRegStar,
  FaCalendarAlt,
  FaEye,
} from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import useProductDetails from "../hooks/useProductDetails";
import useProducts from "../hooks/useProducts";
import { useCart } from "../Contexts/CartContext";
import { toast } from "react-toastify";
import Slider from "react-slick";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 700,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3500,
  arrows: true,
  responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

const ProductCard = ({ product, onView }) => (
  <motion.div
    whileHover={{ y: -5, boxShadow: "0 8px 32px rgba(127,111,255,0.15)" }}
    className="product-slider-card h-100 d-flex flex-column border-0 rounded-4 overflow-hidden shadow bg-white"
    style={{ minHeight: 350 }}
  >
    <div className="position-relative">
      <img
        src={product?.pictureUrl}
        alt={product?.name}
        className="img-fluid w-100"
        style={{ height: "180px", objectFit: "cover" }}
      />
      {product?.isBestSeller && (
        <Badge bg="warning" className="position-absolute top-0 start-0 m-2">
          Bestseller
        </Badge>
      )}
      <Badge bg="secondary" className="position-absolute top-0 end-0 m-2">
        {product?.productCategory}
      </Badge>
    </div>
    <div className="p-3 d-flex flex-column flex-grow-1">
      <div className="mb-2">
        {product?.productBrand && (
          <Badge bg="secondary" className="me-2">
            {product?.productBrand}
          </Badge>
        )}
        <Badge bg="secondary">{product?.skinType}</Badge>
        {product?.concern && (
          <Badge bg="light" text="dark" className="ms-2">
            {product?.concern}
          </Badge>
        )}
      </div>
      <h3 className="h6 mb-2 text-truncate">{product?.name}</h3>
      <div className="d-flex justify-content-between align-items-center mt-2">
        <span className="fw-bold" style={{ color: "#7f6fff" }}>
          {product?.price} EGP
        </span>
        <Button
          variant="outline-secondary"
          size="sm"
          onClick={() => onView(product?.id)}
        >
          <FaEye className="me-1" /> View
        </Button>
      </div>
    </div>
  </motion.div>
);

const ProductDetails = () => {
  const { id } = useParams();
  const { data: product, isLoading, error } = useProductDetails(id);
  const navigate = useNavigate();
  const { addToCart, cart } = useCart();
  const [topSellers, setTopSellers] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [loadingSliders, setLoadingSliders] = useState(true);
  const { fetchProducts } = useProducts();

  useEffect(() => {
    const fetchSliderProducts = async () => {
      setLoadingSliders(true);
      try {
        const bestSellersRes = await fetchProducts({ BestSeller: true });
        const newArrivalsRes = await fetchProducts({ NewArrivals: true });
        setTopSellers(
          bestSellersRes.data?.filter((p) => p.id !== Number(id)).slice(0, 8) ||
            []
        );
        setNewArrivals(
          newArrivalsRes.data?.filter((p) => p.id !== Number(id)).slice(0, 8) ||
            []
        );
      } catch {
        setTopSellers([]);
        setNewArrivals([]);
      } finally {
        setLoadingSliders(false);
      }
    };
    fetchSliderProducts();
    // eslint-disable-next-line
  }, [id]);

  const isInCart = (productId) => {
    return cart.some((item) => item.id === productId);
  };

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`Added to cart!`);
  };

  if (isLoading) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "50vh" }}
      >
        <Spinner animation="border" role="output">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger" className="text-center">
          {error.message || error.toString()}
          <div className="mt-3">
            <Button variant="primary" onClick={() => navigate(-1)}>
              Back to Products
            </Button>
          </div>
        </Alert>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container className="py-5">
        <Alert variant="warning" className="text-center">
          Product not found
          <div className="mt-3">
            <Button variant="primary" onClick={() => navigate("/products")}>
              Browse Products
            </Button>
          </div>
        </Alert>
      </Container>
    );
  }

  let topSellersContent;
  if (loadingSliders) {
    topSellersContent = (
      <div className="d-flex justify-content-center align-items-center py-5">
        <Spinner animation="border" role="output">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  } else if (topSellers.length > 0) {
    topSellersContent = (
      <Slider {...sliderSettings} className="modern-slick-slider">
        {topSellers.map((p) => (
          <div key={p.id} className="px-2 py-3">
            <ProductCard
              product={p}
              onView={(pid) => navigate(`/products/${pid}`)}
            />
          </div>
        ))}
      </Slider>
    );
  } else {
    topSellersContent = (
      <div className="text-center text-muted py-4">No top sellers found.</div>
    );
  }

  let newArrivalsContent;
  if (loadingSliders) {
    newArrivalsContent = (
      <div className="d-flex justify-content-center align-items-center py-5">
        <Spinner animation="border" role="output">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  } else if (newArrivals.length > 0) {
    newArrivalsContent = (
      <Slider {...sliderSettings} className="modern-slick-slider">
        {newArrivals.map((p) => (
          <div key={p.id} className="px-2 py-3">
            <ProductCard
              product={p}
              onView={(pid) => navigate(`/products/${pid}`)}
            />
          </div>
        ))}
      </Slider>
    );
  } else {
    newArrivalsContent = (
      <div className="text-center text-muted py-4">No new arrivals found.</div>
    );
  }

  return (
    <Container
      fluid
      className="py-5 px-2 px-md-4 modern-bg"
      style={{
        background: "linear-gradient(135deg, #f8f9fb 60%, #e6e6fa 100%)",
        minHeight: "100vh",
      }}
    >
      <Row className="justify-content-center align-items-center g-0 mb-5">
        <Col xs={12} md={10} lg={8}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="modern-product-card d-flex flex-column flex-md-row align-items-center justify-content-between p-4 p-md-5 rounded-5 shadow-lg position-relative overflow-hidden bg-white border-0"
            style={{
              boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.10)",
              backdropFilter: "blur(8px)",
              border: "1px solid #f0f0fa",
              minHeight: 400,
            }}
          >
            <div
              className="product-image-container position-relative flex-shrink-0 mb-4 mb-md-0 me-md-5"
              style={{ zIndex: 2 }}
            >
              <motion.img
                src={product.pictureUrl}
                alt={product.name}
                className="img-fluid rounded-4 shadow-sm border border-2 border-light"
                style={{
                  maxHeight: 320,
                  minWidth: 200,
                  objectFit: "contain",
                  background: "#f8f9fb",
                }}
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.7 }}
              />
              {product.isBestSeller && (
                <Badge
                  bg="warning"
                  className="position-absolute top-0 start-0 m-2 fs-6 px-3 py-2 rounded-pill shadow"
                >
                  Bestseller
                </Badge>
              )}
            </div>
            <div
              className="flex-grow-1 d-flex flex-column justify-content-between ms-md-4"
              style={{ zIndex: 2 }}
            >
              <div className="mb-3 d-flex align-items-center flex-wrap gap-2">
                <Badge bg="secondary" className="rounded-pill px-3 py-2 small">
                  {product.productCategory}
                </Badge>
                {product.productBrand && (
                  <Badge
                    bg="info"
                    text="dark"
                    className="rounded-pill px-3 py-2 small"
                  >
                    {product.productBrand}
                  </Badge>
                )}
                <Badge
                  bg="light"
                  text="dark"
                  className="rounded-pill px-3 py-2 small"
                >
                  {product.skinType}
                </Badge>
                {product.concern && (
                  <Badge
                    bg="light"
                    text="dark"
                    className="rounded-pill px-3 py-2 small"
                  >
                    {product.concern}
                  </Badge>
                )}
              </div>
              <h1
                className="mb-2 fw-bold modern-title"
                style={{
                  color: "#7f6fff",
                  letterSpacing: "-1px",
                  fontSize: "2.2rem",
                }}
              >
                {product.name}
              </h1>
              <h3
                className="text-primary mb-3 fw-semibold"
                style={{ fontSize: "1.5rem" }}
              >
                {product.price.toFixed(2)} EGP
              </h3>
              <div className="d-flex align-items-center mb-3">
                <div className="text-warning me-2">
                  {[...Array(5)].map((_, i) =>
                    product.salesCount > i * 100 ? (
                      <FaStar key={i} />
                    ) : (
                      <FaRegStar key={i} />
                    )
                  )}
                </div>
                <span className="text-muted">({product.salesCount} sales)</span>
              </div>
              <p
                className="lead mb-4"
                style={{ color: "#444", fontWeight: 400, fontSize: "1.1rem" }}
              >
                {product.description}
              </p>
              <Row className="mb-3 g-2">
                <Col xs={6} className="small">
                  <span className="text-muted">Brand:</span>{" "}
                  <span className="fw-semibold">{product.productBrand}</span>
                </Col>
                <Col xs={6} className="small">
                  <span className="text-muted">Skin Type:</span>{" "}
                  <span className="fw-semibold">{product.skinType}</span>
                </Col>
                <Col xs={6} className="small">
                  <span className="text-muted">Concern:</span>{" "}
                  <span className="fw-semibold">{product.concern}</span>
                </Col>
                <Col xs={6} className="small">
                  <span className="text-muted">Added:</span>{" "}
                  <span className="fw-semibold">
                    <FaCalendarAlt className="me-1" />
                    {format(new Date(product.createdAt), "MMM d, yyyy")}
                  </span>
                </Col>
              </Row>
              <div className="d-flex align-items-center mt-2">
                <Button
                  variant={isInCart(product.id) ? "success" : "primary"}
                  size="md"
                  className="px-4 py-2 rounded-pill shadow-sm modern-add-btn"
                  onClick={handleAddToCart}
                  style={{ fontSize: "1.1rem", minWidth: 170, fontWeight: 500 }}
                >
                  <FaShoppingCart className="me-2" />
                  {isInCart(product.id) ? "Added to Cart" : "Add to Cart"}
                </Button>
              </div>
            </div>
            {/* Decorative background shapes for inspiration */}
            <div
              className="position-absolute top-0 end-0 opacity-25"
              style={{ zIndex: 1 }}
            >
              <svg
                width="180"
                height="180"
                viewBox="0 0 180 180"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="90"
                  cy="90"
                  r="90"
                  fill="#7f6fff"
                  fillOpacity="0.10"
                />
              </svg>
            </div>
            <div
              className="position-absolute bottom-0 start-0 opacity-10"
              style={{ zIndex: 1 }}
            >
              <svg
                width="140"
                height="140"
                viewBox="0 0 140 140"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="70"
                  cy="70"
                  r="70"
                  fill="#7f6fff"
                  fillOpacity="0.13"
                />
              </svg>
            </div>
          </motion.div>
        </Col>
      </Row>
      {/* Top Sellers Slider */}
      <Row className="mb-5">
        <Col xs={12} className="px-md-4 px-lg-6">
          <h2 className="mb-4 fw-bold" style={{ color: "#7f6fff" }}>
            Top Sellers
          </h2>
          {topSellersContent}
        </Col>
      </Row>
      {/* New Arrivals Slider */}
      <Row>
        <Col xs={12} className=" px-md-4 px-lg-6 ">
          <h2 className="mb-4 fw-bold" style={{ color: "#7f6fff" }}>
            New Arrivals
          </h2>
          {newArrivalsContent}
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;
