import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaEnvelope,
  FaChevronRight,
  FaMapMarkerAlt,
  FaPhone,
  FaRegEnvelope,
} from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const Footer = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <footer
      className="pt-5 pb-4 footer-sticky"
      style={{
        backgroundColor: "#1d1d44",
        color: "#ffffff",
      }}
    >
      <div className="container">
        <div className="row g-4">
          <div className="col-md-4" data-aos="fade-up" data-aos-delay="100">
            <h3 className="fw-bold mb-3">Dermacare AI</h3>
            <p className="mb-4" style={{ color: "#ffffff" }}>
              Advanced skin analysis powered by artificial intelligence for
              personalized skincare solutions.
            </p>
            <div className="d-flex gap-3">
              <a
                href="#"
                className="text-white opacity-75 hover-opacity-100 transition-all"
                style={{ fontSize: "1.25rem" }}
              >
                <FaFacebook />
              </a>
              <a
                href="#"
                className="text-white opacity-75 hover-opacity-100 transition-all"
                style={{ fontSize: "1.25rem" }}
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="text-white opacity-75 hover-opacity-100 transition-all"
                style={{ fontSize: "1.25rem" }}
              >
                <FaTwitter />
              </a>
              <a
                href="mailto:info@dermacareai.com"
                className="text-white opacity-75 hover-opacity-100 transition-all"
                style={{ fontSize: "1.25rem" }}
              >
                <FaEnvelope />
              </a>
            </div>
          </div>

          <div className="col-md-2" data-aos="fade-up" data-aos-delay="200">
            <h4 className="h5 fw-bold mb-3">Quick Links</h4>
            <ul className="list-unstyled">
              {[
                { path: "/", name: "Home" },
                { path: "/about", name: "About" },
                { path: "/products", name: "Products" },
                { path: "/contacts", name: "Contact" },
                { path: "/faq", name: "FAQ" },
              ].map((link, index) => (
                <li key={index} className="mb-2">
                  <Link
                    to={link.path}
                    className="text-white text-decoration-none d-flex align-items-center hover-text-white transition-all"
                  >
                    <FaChevronRight className="me-2" size={10} />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-md-3" data-aos="fade-up" data-aos-delay="300">
            <h4 className="h5 fw-bold mb-3">Contact Info</h4>
            <ul className="list-unstyled">
              <li className="mb-3 d-flex align-items-start">
                <FaMapMarkerAlt className="me-2 mt-1" />
                <span>123 Dermatology St, Cairo, Egypt</span>
              </li>
              <li className="mb-3 d-flex align-items-start">
                <FaPhone className="me-2 mt-1" />
                <span>+2 (010) 123 4567</span>
              </li>
              <li className="d-flex align-items-start">
                <FaRegEnvelope className="me-2 mt-1" />
                <span>support@dermacareai.com</span>
              </li>
            </ul>
          </div>

          <div className="col-md-3" data-aos="fade-up" data-aos-delay="400">
            <h4 className="h5 fw-bold mb-3">Newsletter</h4>
            <p className="mb-3">
              Subscribe to get skincare tips and special offers.
            </p>
            <div className="input-group mb-3">
              <input
                type="email"
                className="form-control bg-white border-dark text-white"
                placeholder="Your email"
                aria-label="Your email"
              />
              <button
                className="btn btn-primary"
                type="button"
                style={{ backgroundColor: "#6554E8", borderColor: "#6554E8" }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <hr className="my-4" style={{ borderColor: "#ffffff33" }} />

        <div className="row" data-aos="fade-up" data-aos-delay="500">
          <div className="col-md-12 text-center">
            <p className="mb-0">
              &copy; {new Date().getFullYear()} Dermacare AI. All rights
              reserved. |
              <a href="#" className="text-white ms-2 text-decoration-none">
                Privacy Policy
              </a>{" "}
              |
              <a href="#" className="text-white ms-2 text-decoration-none">
                Terms of Service
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
