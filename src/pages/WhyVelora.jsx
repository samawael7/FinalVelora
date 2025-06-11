import React, { useEffect } from "react";
import image from "../assets/whyvelora.jpg";
import image2 from "../assets/why2.webp";
import image4 from "../assets/why4.webp";
import image3 from "../assets/why3.webp";
import image5 from "../assets/why5_.webp";
import image6 from "../assets/why6.webp";
import image7 from "../assets/why7.webp";
import image8 from "../assets/section3.webp";
import image9 from "../assets/section4.webp";
import {
  FaLeaf,
  FaFlask,
  FaUserMd,
  FaStar,
  FaArrowRight,
} from "react-icons/fa";
import AOS from "aos";

export default function WhyVelora() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
      disable: "mobile",
    });
  }, []);

  return (
    <>
      <section className="py-5 position-relative overflow-hidden">
        <div className="container py-4 py-md-5">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0" data-aos="fade-right">
              <div className="position-relative">
                <div
                  className="bg-primary bg-opacity-10 rounded-circle position-absolute"
                  style={{
                    width: "300px",
                    height: "300px",
                    top: "-20px",
                    left: "-20px",
                    zIndex: -1,
                  }}
                ></div>
                <img
                  src={image}
                  alt="Personal Skincare Service"
                  className="img-fluid rounded-4 shadow-lg transform-hover"
                  style={{
                    maxWidth: "85%",
                    marginLeft: "auto",
                    marginRight: "auto",
                    display: "block",
                  }}
                />
                <div
                  className="position-absolute top-0 end-0 d-none d-lg-block"
                  style={{ transform: "translateX(25%) translateY(25%)" }}
                >
                  <div
                    className="bg-white rounded-4 shadow-lg p-3"
                    data-aos="fade-left"
                    data-aos-delay="300"
                  >
                    <div className="d-flex align-items-center">
                      <div className="bg-primary rounded-circle p-2 text-white">
                        <FaLeaf size={16} />
                      </div>
                      <div className="ms-3">
                        <p className="mb-0 small">Dermatologist Formulated</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6" data-aos="fade-left" data-aos-delay="200">
              <div className="pe-lg-4">
                <span
                  className="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3 py-2 mb-3"
                  data-aos="fade-up"
                  data-aos-delay="300"
                >
                  Personal Care
                </span>

                <h2
                  className="display-5 fw-bold mb-4"
                  style={{ color: "#1d1d44" }}
                >
                  We're your{" "}
                  <span className="position-relative">
                    personal
                    <span
                      className="position-absolute start-0 bottom-0 w-100 bg-warning"
                      style={{ height: "8px", zIndex: "-1", opacity: "0.4" }}
                    ></span>
                  </span>{" "}
                  skincare service
                </h2>

                <p className="lead mb-4" style={{ color: "#5f5f7b" }}>
                  Get paired with one of our licensed dermatology providers for
                  a personalized treatment plan that's based on your skin's
                  unique needs—whether that's acne, dark spots, rosacea, or
                  early signs of aging.
                </p>

                <div className="d-flex flex-wrap mt-4 gap-3">
                  <a
                    href="#consultation"
                    className="btn btn-primary rounded-pill px-4 py-2 d-inline-flex align-items-center"
                  >
                    Start your consultation
                    <FaArrowRight className="ms-2" size={14} />
                  </a>
                  <p className="text-muted fst-italic small mt-2 align-self-end">
                    *Subject to consultation
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 bg-light">
        <div className="container py-4 py-md-5">
          <div className="row align-items-center">
            <div
              className="col-lg-6 order-lg-2 mb-4 mb-lg-0"
              data-aos="fade-left"
            >
              <div className="position-relative">
                <img
                  src={image2}
                  alt="Prescription Formulas"
                  className="img-fluid rounded-4 shadow-lg w-100 transform-hover"
                  style={{ objectFit: "cover", height: "500px" }}
                />
                <div
                  className="position-absolute bottom-0 start-0 d-none d-lg-block"
                  style={{ transform: "translateX(-25%) translateY(25%)" }}
                >
                  <div
                    className="bg-white rounded-4 shadow-lg p-3"
                    data-aos="fade-up"
                    data-aos-delay="400"
                  >
                    <div className="d-flex align-items-center">
                      <div className="bg-success rounded-circle p-2 text-white">
                        <FaFlask size={16} />
                      </div>
                      <div className="ms-3">
                        <p className="mb-0 small">Custom Formulations</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="col-lg-6 order-lg-1"
              data-aos="fade-right"
              data-aos-delay="200"
            >
              <div className="pe-lg-4">
                <span className="badge bg-success bg-opacity-10 text-success rounded-pill px-3 py-2 mb-3">
                  Formulation
                </span>

                <h2
                  className="display-5 fw-bold mb-4"
                  style={{ color: "#1d1d44" }}
                >
                  Meet our{" "}
                  <span className="position-relative">
                    prescription
                    <span
                      className="position-absolute start-0 bottom-0 w-100 bg-success"
                      style={{ height: "8px", zIndex: "-1", opacity: "0.4" }}
                    ></span>
                  </span>{" "}
                  formulas
                </h2>

                <p className="lead mb-4" style={{ color: "#5f5f7b" }}>
                  Your licensed dermatology provider prescribes one of our
                  personalized formulas* (Custom FormulaRx or HydroTretRx) based
                  on a variety of factors specific to you, then selects 3
                  clinically proven ingredients that work better together to
                  give you more effective results.
                </p>

                <div className="d-flex align-items-center gap-4 mt-4">
                  <div className="d-flex align-items-center">
                    <div className="rounded-circle bg-primary bg-opacity-10 p-2">
                      <FaStar className="text-primary" size={16} />
                    </div>
                    <span className="ms-2 fw-medium">Personalized Care</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="rounded-circle bg-primary bg-opacity-10 p-2">
                      <FaUserMd className="text-primary" size={16} />
                    </div>
                    <span className="ms-2 fw-medium">Expert Providers</span>
                  </div>
                </div>

                <p className="text-muted fst-italic small mt-4">
                  *Subject to consultation
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container py-4 py-md-5">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0" data-aos="fade-right">
              <div className="position-relative">
                <div
                  className="bg-warning bg-opacity-10 rounded-circle position-absolute"
                  style={{
                    width: "250px",
                    height: "250px",
                    bottom: "-20px",
                    right: "-20px",
                    zIndex: -1,
                  }}
                ></div>
                <img
                  src={image3}
                  alt="Power of Prescription"
                  className="img-fluid rounded-4 shadow-lg w-100 transform-hover"
                  style={{ objectFit: "cover", height: "500px" }}
                />
                <div
                  className="position-absolute top-0 end-0 d-none d-lg-block"
                  style={{ transform: "translateX(25%) translateY(-15%)" }}
                >
                  <div
                    className="bg-white rounded-4 shadow-lg p-3"
                    data-aos="fade-down"
                    data-aos-delay="400"
                  >
                    <div className="d-flex align-items-center">
                      <div className="bg-warning rounded-circle p-2 text-white">
                        <FaFlask size={16} />
                      </div>
                      <div className="ms-3">
                        <p className="mb-0 small">Clinically Proven</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6" data-aos="fade-left" data-aos-delay="200">
              <div className="ps-lg-5">
                <span className="badge bg-warning bg-opacity-10 text-warning rounded-pill px-3 py-2 mb-3">
                  Treatment
                </span>

                <h2
                  className="display-5 fw-bold mb-4"
                  style={{ color: "#1d1d44" }}
                >
                  The power of{" "}
                  <span className="position-relative">
                    prescription
                    <span
                      className="position-absolute start-0 bottom-0 w-100 bg-warning"
                      style={{ height: "8px", zIndex: "-1", opacity: "0.4" }}
                    ></span>
                  </span>{" "}
                  treatment
                </h2>

                <p className="lead mb-4" style={{ color: "#5f5f7b" }}>
                  Our Rx skincare uses a combination of clinically researched
                  ingredients to address specific skin concerns, making it more
                  effective than non-prescription cleansers and moisturizers
                  alone.
                </p>

                <div className="d-flex flex-wrap gap-3 mt-4">
                  <button
                    className="btn btn-primary btn-lg rounded-pill px-4 py-2 shadow-sm w-50"
                    style={{ backgroundColor: "#7f6fff" }}
                  >
                    UNLOCK Your Offer
                    <FaArrowRight className="ms-2" size={14} />
                  </button>
                  <p className="text-muted fst-italic small mt-2 align-self-end">
                    *Subject to consultation
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 bg-light position-relative overflow-hidden">
        <div className="container py-4 py-md-5">
          <div className="text-center mb-5" data-aos="fade-up">
            <span className="badge bg-info bg-opacity-10 text-info rounded-pill px-3 py-2 mb-3">
              Success Stories
            </span>
            <h2 className="display-5 fw-bold" style={{ color: "#1d1d44" }}>
              Real results from real people
            </h2>
            <p
              className="lead text-muted mx-auto"
              style={{ maxWidth: "700px" }}
            >
              See the transformations our customers have experienced with our
              personalized treatments
            </p>
          </div>

          <div
            id="resultCarousel"
            className="carousel slide"
            data-bs-ride="carousel"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className="carousel-inner">
              {/* Slide 1 */}
              <div className="carousel-item active">
                <div className="row g-4">
                  {/* Left Testimonial */}
                  <div className="col-lg-6">
                    <div className="card h-100 border-0 rounded-4 shadow-sm hover-lift">
                      <div className="card-body p-4">
                        <div className="d-flex justify-content-between mb-4">
                          <div>
                            <span className="badge bg-success rounded-pill mb-2">
                              After 6 Months
                            </span>
                            <div className="d-flex mt-2">
                              {[1, 2, 3, 4, 5].map((i) => (
                                <FaStar key={i} className="text-warning me-1" />
                              ))}
                            </div>
                          </div>
                          <span className="fs-1 text-primary opacity-25">
                            "
                          </span>
                        </div>
                        <div className="text-center mb-4">
                          <img
                            src={image4}
                            alt="Before and After"
                            className="img-fluid rounded-3 shadow-sm"
                            style={{ maxHeight: "300px" }}
                          />
                        </div>
                        <p
                          className="card-text mb-4"
                          style={{ color: "#1d1d44" }}
                        >
                          "I have struggled with acne ever since I hit puberty.
                          I searched for YEARS for a skin care routine that
                          would work with my skin. Within a month I had already
                          started noticing huge changes in the texture of my
                          skin, my active breakouts went down, and dark spots
                          started to fade. By 6 months my acne was cleared.
                          Velora has helped give me a new found confidence in
                          myself. THANK YOU VELORA."
                        </p>
                        <div className="d-flex align-items-center">
                          <div className="bg-primary rounded-circle p-2 text-white">
                            <FaUserMd size={14} />
                          </div>
                          <p className="mb-0 ms-2 fw-bold">Sarah T.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="card h-100 border-0 rounded-4 shadow-sm hover-lift">
                      <div className="card-body p-4">
                        <div className="d-flex justify-content-between mb-4">
                          <div>
                            <span className="badge bg-success rounded-pill mb-2">
                              After 9 Months
                            </span>
                            <div className="d-flex mt-2">
                              {[1, 2, 3, 4, 5].map((i) => (
                                <FaStar key={i} className="text-warning me-1" />
                              ))}
                            </div>
                          </div>
                          <span className="fs-1 text-primary opacity-25">
                            "
                          </span>
                        </div>
                        <div className="text-center mb-4">
                          <img
                            src={image5}
                            alt="Before and After"
                            className="img-fluid rounded-3 shadow-sm"
                            style={{ maxHeight: "300px" }}
                          />
                        </div>
                        <p
                          className="card-text mb-4"
                          style={{ color: "#1d1d44" }}
                        >
                          "My skin has cleared up so much ever since the start
                          of my journey! It's been 9 months using Velora and I
                          can't be happier!"
                        </p>
                        <div className="d-flex align-items-center">
                          <div className="bg-primary rounded-circle p-2 text-white">
                            <FaUserMd size={14} />
                          </div>
                          <p className="mb-0 ms-2 fw-bold">Michael R.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Slide 2 */}
              <div className="carousel-item">
                <div className="row g-4">
                  {/* Left Testimonial */}
                  <div className="col-lg-6">
                    <div className="card h-100 border-0 rounded-4 shadow-sm hover-lift">
                      <div className="card-body p-4">
                        <div className="d-flex justify-content-between mb-4">
                          <div>
                            <span className="badge bg-success rounded-pill mb-2">
                              After 3 Years
                            </span>
                            <div className="d-flex mt-2">
                              {[1, 2, 3, 4, 5].map((i) => (
                                <FaStar key={i} className="text-warning me-1" />
                              ))}
                            </div>
                          </div>
                          <span className="fs-1 text-primary opacity-25">
                            "
                          </span>
                        </div>
                        <div className="text-center mb-4">
                          <img
                            src={image6}
                            alt="Before and After"
                            className="img-fluid rounded-3 shadow-sm"
                            style={{ maxHeight: "300px" }}
                          />
                        </div>
                        <p
                          className="card-text mb-4"
                          style={{ color: "#1d1d44" }}
                        >
                          "I could not find anything that would help control and
                          get rid of my acne. It was a huge insecurity and
                          pretty frustrating. I saw ads for Velora and decided
                          to give it a shot, and I'm glad I did!"
                        </p>
                        <div className="d-flex align-items-center">
                          <div className="bg-primary rounded-circle p-2 text-white">
                            <FaUserMd size={14} />
                          </div>
                          <p className="mb-0 ms-2 fw-bold">Jessica K.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Testimonial */}
                  <div className="col-lg-6">
                    <div className="card h-100 border-0 rounded-4 shadow-sm hover-lift">
                      <div className="card-body p-4">
                        <div className="d-flex justify-content-between mb-4">
                          <div>
                            <span className="badge bg-success rounded-pill mb-2">
                              After 2 Months
                            </span>
                            <div className="d-flex mt-2">
                              {[1, 2, 3, 4, 5].map((i) => (
                                <FaStar key={i} className="text-warning me-1" />
                              ))}
                            </div>
                          </div>
                          <span className="fs-1 text-primary opacity-25">
                            "
                          </span>
                        </div>
                        <div className="text-center mb-4">
                          <img
                            src={image7}
                            alt="Before and After"
                            className="img-fluid rounded-3 shadow-sm"
                            style={{ maxHeight: "300px" }}
                          />
                        </div>
                        <p
                          className="card-text mb-4"
                          style={{ color: "#1d1d44" }}
                        >
                          "I hated my skin. I tried every popular product and
                          things only got worse. After one week of use my
                          pimples stopped showing up! Fast forward to two
                          months, my skin is acne free, almost all of my acne
                          scars are gone, and my skin looks smooth and tight!"
                        </p>
                        <div className="d-flex align-items-center">
                          <div className="bg-primary rounded-circle p-2 text-white">
                            <FaUserMd size={14} />
                          </div>
                          <p className="mb-0 ms-2 fw-bold">Alex T.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-center gap-2 mt-4">
              <button
                className="btn btn-primary btn-sm rounded-circle d-flex justify-content-center align-items-center"
                style={{ width: "40px", height: "40px" }}
                type="button"
                data-bs-target="#resultCarousel"
                data-bs-slide="prev"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-chevron-left"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                  />
                </svg>
              </button>
              <button
                className="btn btn-primary btn-sm rounded-circle d-flex justify-content-center align-items-center"
                style={{ width: "40px", height: "40px" }}
                type="button"
                data-bs-target="#resultCarousel"
                data-bs-slide="next"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-chevron-right"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 1 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="position-absolute bottom-0 end-0 d-none d-lg-block">
          <div
            className="bg-primary bg-opacity-10 rounded-circle"
            style={{
              width: "300px",
              height: "300px",
              transform: "translate(150px, 50px)",
            }}
          ></div>
        </div>
      </section>

      {/* Fifth Section - Making Skincare Accessible */}
      <section className="py-5">
        <div className="container py-4 py-md-5">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0" data-aos="fade-right">
              <div className="position-relative">
                <div
                  className="bg-info bg-opacity-10 rounded-circle position-absolute"
                  style={{
                    width: "250px",
                    height: "250px",
                    top: "-20px",
                    left: "-20px",
                    zIndex: -1,
                  }}
                ></div>
                <img
                  src={image8}
                  alt="Making Skincare Accessible"
                  className="img-fluid rounded-4 shadow-lg w-100 transform-hover"
                  style={{ objectFit: "cover", height: "500px" }}
                />
              </div>
            </div>

            <div className="col-lg-6" data-aos="fade-left" data-aos-delay="200">
              <div className="ps-lg-5">
                <span className="badge bg-info bg-opacity-10 text-info rounded-pill px-3 py-2 mb-3">
                  Accessibility
                </span>

                <h2
                  className="display-5 fw-bold mb-4"
                  style={{ color: "#1d1d44" }}
                >
                  Making effective{" "}
                  <span className="position-relative">
                    skincare
                    <span
                      className="position-absolute start-0 bottom-0 w-100 bg-info"
                      style={{ height: "8px", zIndex: "-1", opacity: "0.4" }}
                    ></span>
                  </span>{" "}
                  accessible
                </h2>

                <p className="lead mb-4" style={{ color: "#5f5f7b" }}>
                  We were founded by dermatologists who believe everyone should
                  have access to skincare products that actually work. Our
                  growing team of dermatology providers has now helped millions
                  of patients across all 50 states to make that dream a reality.
                </p>

                <div className="d-flex flex-wrap gap-3 mt-4">
                  <button
                    className="btn btn-primary btn-lg rounded-pill px-4 py-2 shadow-sm w-50"
                    style={{ backgroundColor: "#7f6fff" }}
                  >
                    Read Our Stories
                    <FaArrowRight className="ms-2" size={14} />
                  </button>
                  <p className="text-muted fst-italic small mt-2 align-self-end">
                    *Subject to consultation
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Section - Ready for that Glow */}
      <section className="py-5 bg-gradient-primary position-relative overflow-hidden">
        <div className="container py-5">
          <div className="row align-items-center">
            <div
              className="col-lg-6 order-lg-2 mb-4 mb-lg-0"
              data-aos="fade-left"
            >
              <div className="position-relative">
                <div
                  className="bg-warning bg-opacity-25 rounded-circle position-absolute"
                  style={{
                    width: "250px",
                    height: "250px",
                    bottom: "-50px",
                    right: "-50px",
                    zIndex: -1,
                  }}
                ></div>
                <img
                  src={image9}
                  alt="Ready for that Glow"
                  className="img-fluid rounded-4 shadow-lg w-100 transform-hover"
                  style={{ objectFit: "cover", height: "500px" }}
                />
                <div
                  className="position-absolute top-0 start-0 d-none d-lg-block"
                  style={{ transform: "translateX(-25%) translateY(-25%)" }}
                >
                  <div
                    className="bg-white rounded-4 shadow-lg p-3"
                    data-aos="fade-right"
                    data-aos-delay="400"
                  >
                    <div className="d-flex align-items-center">
                      <div className="bg-warning rounded-circle p-2 text-white">
                        <FaStar size={16} />
                      </div>
                      <div className="ms-3">
                        <p className="mb-0 small">5-Star Reviews</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="col-lg-6 order-lg-1"
              data-aos="fade-right"
              data-aos-delay="200"
            >
              <div className="pe-lg-5">
                <span className="badge bg-light text-primary rounded-pill px-3 py-2 mb-3">
                  Start Today
                </span>

                <h2 className="display-4 fw-bold mb-4 text-white">
                  Ready to go for that{" "}
                  <span className="position-relative">
                    glow
                    <span
                      className="position-absolute start-0 bottom-0 w-100 bg-warning"
                      style={{ height: "8px", zIndex: "-1", opacity: "0.6" }}
                    ></span>
                  </span>
                  ?
                </h2>

                <p className="lead mb-4 text-white text-opacity-75">
                  Get started on your personalized skincare journey today.
                </p>

                <div className="d-flex flex-wrap gap-3 mt-4">
                  <button className="btn btn-light btn-lg rounded-pill px-4 py-3 shadow-sm fw-bold text-primary w-50">
                    UNLOCK Your Offer
                    <FaArrowRight className="ms-2" size={14} />
                  </button>
                  <p className="text-white text-opacity-75 fst-italic small mt-2 align-self-end">
                    *Subject to consultation
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Element */}
        <div className="position-absolute top-0 start-0 d-none d-lg-block">
          <div
            className="bg-white bg-opacity-10 rounded-circle"
            style={{
              width: "400px",
              height: "400px",
              transform: "translate(-200px, -100px)",
            }}
          ></div>
        </div>
      </section>

      {/* Custom CSS for animations and styling */}
      <style jsx>{`
        /* Transform hover effect */
        .transform-hover {
          transition: transform 0.5s ease, box-shadow 0.5s ease;
          will-change: transform;
        }
        
        @media (min-width: 992px) {
          .transform-hover:hover {
            transform: scale(1.02) translateY(-5px);
            box-shadow: 0 1.5rem 2.5rem rgba(0,0,0,.15)!important;
          }
        }
        
        /* Hover lift effect for cards */
        .hover-lift {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .hover-lift:hover {
          transform: translateY(-10px);
          box-shadow: 0 1rem 2rem rgba(0,0,0,.1)!important;
        }
        
        /* Gradient backgrounds */
        .bg-gradient-primary {
          background: linear-gradient(135deg, #6554E8 0%, #7f6fff 100%);
        }
        
        /* Responsive typography */
        @media (max-width: 767.98px) {
          .display-4, .display-5 {
            font-size: calc(1.375rem + 1.5vw);
          }
          
          .lead {
            font-size: 1rem;
          }
          `}</style>
    </>
  );
}
