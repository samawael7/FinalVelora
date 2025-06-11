import React, { useEffect } from "react";
import bgImage from "../assets/home sec1.webp";
import cardImg from "../assets/home sec2.webp";
import cardImg2 from "../assets/card.webp";
import {
  FaHeart,
  FaUserMd,
  FaFlask,
  FaCamera,
  FaStar,
  FaSmile,
  FaArrowRight,
  FaUser,
} from "react-icons/fa";
import AOS from "aos";

const HeroSection = () => {
  useEffect(() => {
    // Initialize AOS animation library
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
      disable: "mobile", // Disable animations on mobile for better performance
    });
  }, []);

  return (
    <>
      {/* Hero Section with Gradient Overlay and Animated Elements */}
      <section className="position-relative overflow-hidden">
        <div
          className="hero-bg-wrapper"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.6)), url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "100vh",
            position: "relative",
          }}
        >
          {/* Decorative Elements - Only visible on larger screens */}
          <div className="position-absolute top-0 end-0 d-none d-lg-block">
            <div
              className="bg-info bg-opacity-25 rounded-circle"
              style={{
                width: "300px",
                height: "300px",
                transform: "translate(100px, -100px)",
              }}
              data-aos="fade-left"
            ></div>
          </div>

          <div className="position-absolute bottom-0 start-0 d-none d-lg-block">
            <div
              className="bg-primary bg-opacity-10 rounded-circle"
              style={{
                width: "200px",
                height: "200px",
                transform: "translate(-50px, 50px)",
              }}
              data-aos="fade-up-right"
              data-aos-delay="300"
            ></div>
          </div>

          <div className="container py-4 py-lg-5">
            <div className="row min-vh-100 align-items-center">
              <div
                className="col-12 col-lg-7 py-3 py-lg-5"
                data-aos="fade-right"
              >
                <span
                  className="badge bg-primary rounded-pill px-2 px-md-3 py-1 py-md-2 mb-3 fw-normal"
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  Your AI Dermatologist
                </span>

                <h1
                  className="display-4 display-md-3 fw-bold mb-3 mb-md-4"
                  style={{
                    color: "#1d1d44",
                    letterSpacing: "-0.05rem",
                    lineHeight: "1.1",
                  }}
                >
                  Get a{" "}
                  <span className="position-relative">
                    FREE*
                    <span
                      className="position-absolute start-0 bottom-0 w-100 bg-warning"
                      style={{ height: "8px", zIndex: "-1", opacity: "0.4" }}
                    ></span>
                  </span>{" "}
                  month of made-for-you,
                  <span className="text-primary"> prescription skincare</span>
                </h1>

                <p
                  className="lead mb-3 mb-md-4 text-dark fw-normal"
                  style={{ maxWidth: "550px" }}
                >
                  Expert-crafted solutions tailored to your unique skin profile.
                  Subscribe today for a $53 value – just pay $5 shipping!
                </p>

                <div className="d-flex flex-wrap gap-2 gap-md-3 mb-4">
                  <a
                    href="#treatment"
                    className="btn btn-primary px-3 px-md-4 py-2 py-md-3 rounded-pill shadow-sm fs-6"
                  >
                    Start Your Consultation
                    <FaArrowRight className="ms-2" />
                  </a>

                  <a
                    href="#learn-more"
                    className="btn btn-outline-dark px-3 px-md-4 py-2 py-md-3 rounded-pill d-inline-flex align-items-center fs-6"
                  >
                    See How It Works
                  </a>
                </div>

                <div className="d-flex align-items-center mt-3 mt-md-4">
                  <div className="d-flex">
                    {/* User avatars with icon fallbacks instead of random user images */}
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="rounded-circle overflow-hidden border border-2 border-white bg-light d-flex align-items-center justify-content-center"
                        style={{
                          width: "32px",
                          height: "32px",
                          marginLeft: i > 1 ? "-10px" : "0",
                          zIndex: 4 - i,
                        }}
                      >
                        <FaUser className="text-secondary" />
                      </div>
                    ))}
                  </div>
                  <div className="ms-2 ms-md-3">
                    <div className="d-flex align-items-center">
                      <span className="me-2">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <FaStar
                            key={i}
                            className="text-warning"
                            style={{ fontSize: "0.7rem" }}
                          />
                        ))}
                      </span>
                      <span className="fw-bold fs-6">4.9/5</span>
                    </div>
                    <p className="mb-0 text-muted small">
                      From 2,000+ satisfied customers
                    </p>
                  </div>
                </div>
              </div>

              {/* Product Image - Hidden on extra small screens, shown from sm up */}
              <div
                className="col-12 col-lg-5 d-none d-sm-block"
                data-aos="fade-left"
                data-aos-delay="200"
              >
                <div className="position-relative">
                  <div
                    className="shadow-lg rounded-4 overflow-hidden"
                    style={{ transform: "rotate(-3deg)" }}
                  >
                    <img
                      src={cardImg}
                      alt="Skincare Product"
                      className="img-fluid"
                    />
                  </div>

                  {/* Floating cards - visible on md screens and up */}
                  <div
                    className="position-absolute top-50 end-0 d-none d-md-block"
                    style={{ transform: "translateX(30%) translateY(-80%)" }}
                  >
                    <div
                      className="bg-white rounded-4 shadow-lg p-2 p-md-3"
                      data-aos="fade-up"
                      data-aos-delay="400"
                    >
                      <div className="d-flex align-items-center">
                        <div className="bg-primary rounded-circle p-1 p-md-2 text-white">
                          <FaUserMd size={16} />
                        </div>
                        <div className="ms-2 ms-md-3">
                          <p className="mb-0 small">Dermatologist Approved</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="position-absolute bottom-0 start-0 d-none d-md-block"
                    style={{ transform: "translateX(-20%) translateY(20%)" }}
                  >
                    <div
                      className="bg-white rounded-4 shadow-lg p-2 p-md-3"
                      data-aos="fade-up"
                      data-aos-delay="600"
                    >
                      <div className="d-flex align-items-center">
                        <div className="bg-success rounded-circle p-1 p-md-2 text-white">
                          <FaFlask size={16} />
                        </div>
                        <div className="ms-2 ms-md-3">
                          <p className="mb-0 small">Clinically Tested</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with Animated Cards */}
      <section className="py-4 py-md-5" style={{ backgroundColor: "#6554E8" }}>
        <div className="container py-3 py-md-5">
          <div className="row mb-4 mb-md-5">
            <div className="col-lg-7">
              <h2
                className="display-6 display-md-5 fw-bold text-white mb-3 mb-md-4"
                data-aos="fade-up"
              >
                Skincare guided by real dermatology experts
              </h2>
              <p
                className="lead text-white opacity-75"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                Our AI-powered platform connects you with licensed
                dermatologists who analyze your unique skin profile.
              </p>
            </div>
          </div>

          <div className="row g-3 g-md-4">
            {/* Card 1 */}
            <div
              className="col-12 col-md-6"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="card h-100 border-0 rounded-4 shadow-lg overflow-hidden transition-hover">
                <div className="position-relative">
                  <img
                    src={cardImg2}
                    className="card-img-top"
                    alt="Skin Consultation"
                  />
                  <div className="position-absolute top-0 start-0 w-100 h-100 bg-gradient-dark opacity-50"></div>
                  <div className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-between p-3 p-md-4">
                    <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                      <span className="badge bg-primary rounded-pill px-2 px-md-3 py-1 py-md-2">
                        Personalized Analysis
                      </span>
                      <span className="badge bg-dark bg-opacity-75 rounded-pill px-2 px-md-3 py-1 py-md-2">
                        5 min process
                      </span>
                    </div>
                    <div>
                      <a
                        href="#consultation"
                        className="btn btn-light rounded-pill px-3 px-md-4 py-1 py-md-2 fw-bold d-inline-flex align-items-center fs-6"
                      >
                        Start consultation{" "}
                        <FaArrowRight className="ms-1 ms-md-2" size={14} />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="card-body p-3 p-md-4">
                  <h3 className="h5 h4-md fw-bold mb-2 mb-md-3">
                    AI-Powered Skin Analysis
                  </h3>
                  <p className="card-text small">
                    Upload your selfie and answer a few questions to receive a
                    personalized skin assessment from our advanced AI system.
                  </p>

                  <div className="d-flex justify-content-between mt-3 mt-md-4 pt-2 pt-md-3 border-top flex-wrap">
                    <div className="d-flex align-items-center mb-2 mb-md-0">
                      <FaCamera className="text-primary" size={14} />
                      <span className="ms-1 ms-md-2 small">Photo Analysis</span>
                    </div>
                    <div className="d-flex align-items-center mb-2 mb-md-0">
                      <FaFlask className="text-primary" size={14} />
                      <span className="ms-1 ms-md-2 small">Lab Tested</span>
                    </div>
                    <div className="d-flex align-items-center">
                      <FaHeart className="text-primary" size={14} />
                      <span className="ms-1 ms-md-2 small">98% Accuracy</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div
              className="col-12 col-md-6"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <div className="card h-100 border-0 rounded-4 shadow-lg overflow-hidden transition-hover">
                <div className="position-relative">
                  <img
                    src={cardImg}
                    className="card-img-top"
                    alt="Personalized Treatment"
                  />
                  <div className="position-absolute top-0 start-0 w-100 h-100 bg-gradient-dark opacity-50"></div>
                  <div className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-between p-3 p-md-4">
                    <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                      <span className="badge bg-success rounded-pill px-2 px-md-3 py-1 py-md-2">
                        Custom Formulas
                      </span>
                      <span className="badge bg-dark bg-opacity-75 rounded-pill px-2 px-md-3 py-1 py-md-2">
                        Monthly Delivery
                      </span>
                    </div>
                    <div>
                      <a
                        href="#consultation"
                        className="btn btn-light rounded-pill px-3 px-md-4 py-1 py-md-2 fw-bold d-inline-flex align-items-center fs-6"
                      >
                        Get your formula{" "}
                        <FaArrowRight className="ms-1 ms-md-2" size={14} />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="card-body p-3 p-md-4">
                  <h3 className="h5 h4-md fw-bold mb-2 mb-md-3">
                    Custom Treatment Plan
                  </h3>
                  <p className="card-text small">
                    Receive a personalized skincare regimen with
                    prescription-strength ingredients tailored to your specific
                    concerns.
                  </p>

                  <div className="d-flex justify-content-between mt-3 mt-md-4 pt-2 pt-md-3 border-top flex-wrap">
                    <div className="d-flex align-items-center mb-2 mb-md-0">
                      <FaUserMd className="text-primary" size={14} />
                      <span className="ms-1 ms-md-2 small">
                        Doctor Approved
                      </span>
                    </div>
                    <div className="d-flex align-items-center mb-2 mb-md-0">
                      <FaStar className="text-primary" size={14} />
                      <span className="ms-1 ms-md-2 small">
                        Premium Quality
                      </span>
                    </div>
                    <div className="d-flex align-items-center">
                      <FaSmile className="text-primary" size={14} />
                      <span className="ms-1 ms-md-2 small">
                        100% Satisfaction
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Add CSS for animations and transitions */}
      <style jsx>{`
        /* Custom Transitions */
        .transition-hover {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          will-change: transform;
        }

        @media (min-width: 768px) {
          .transition-hover:hover {
            transform: translateY(-10px);
            box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175) !important;
          }
        }

        /* Background gradients */
        .bg-gradient-dark {
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.1),
            rgba(0, 0, 0, 0.7)
          );
        }

        /* Animation delays for staggered elements */
        @media (min-width: 992px) {
          .hero-bg-wrapper {
            animation: gradientShift 15s ease infinite;
          }
        }

        /* For medium screens */
        @media (min-width: 768px) and (max-width: 991.98px) {
          .h4-md {
            font-size: 1.25rem;
          }
          .display-md-3 {
            font-size: calc(1.525rem + 1.5vw);
          }
          .display-md-5 {
            font-size: calc(1.425rem + 1.2vw);
          }
        }

        /* For small screens */
        @media (max-width: 767.98px) {
          .card-body {
            padding: 1rem;
          }
          .display-6 {
            font-size: 1.5rem;
          }
          .lead {
            font-size: 1rem;
          }
        }

        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </>
  );
};

export default HeroSection;
