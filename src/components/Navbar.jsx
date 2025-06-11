import React, { useState } from "react";
import logo from "../assets/logo.webp";
import shopImage from "../assets/shopimage.jpg";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { FaChevronDown, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";
import CartIcon from "./CartIcon";

const CustomNavbar = () => {
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleShopNowClick = () => {
    navigate("/products");
  };

  return (
    <Navbar
      expand="lg"
      className="bg-white container py-3 border-bottom shadow-sm"
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img
            src={logo}
            alt="VeloraLogo"
            style={{ height: "32px", marginRight: "8px" }}
          />
          <span style={{ fontWeight: "700", color: "#1d1d44" }}>VELORA</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center gap-3">
            <Nav.Link
              as={Link}
              to="/"
              style={{ fontWeight: "700", color: "#1d1d44" }}
            >
              Home
            </Nav.Link>

            {/* Shop Mega Menu */}
            <div
              onMouseEnter={() => setShowMegaMenu(true)}
              onMouseLeave={() => setShowMegaMenu(false)}
              style={{ position: "relative" }}
            >
              <span
                className="nav-link"
                style={{
                  fontWeight: "700",
                  color: "#1d1d44",
                  cursor: "pointer",
                  padding: "8px 12px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                Shop <FaChevronDown size={12} />
              </span>

              <div
                style={{
                  opacity: showMegaMenu ? 1 : 0,
                  visibility: showMegaMenu ? "visible" : "hidden",
                  transform: showMegaMenu
                    ? "translateY(0)"
                    : "translateY(10px)",
                  transition: "all 0.3s ease",
                  position: "fixed",
                  top: "70px",
                  left: 0,
                  width: "100vw",
                  backgroundColor: "#fff",
                  zIndex: 999,
                  padding: "32px 64px",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                  borderTop: "1px solid #e0e0e0",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    maxWidth: "1200px",
                    margin: "0 auto",
                    gap: "48px",
                  }}
                >
                  <div
                    style={{ display: "flex", gap: "48px", flexWrap: "wrap" }}
                  >
                    {/* Column 1 */}
                    <div>
                      <h6
                        style={{
                          color: "#7f6fff",
                          fontWeight: "700",
                          marginBottom: "12px",
                        }}
                      >
                        All Products
                      </h6>
                      <Nav.Link as={Link} to="/products?BestSeller=true">
                        Best Sellers
                      </Nav.Link>
                      <Nav.Link as={Link} to="/products?NewArrivals=true">
                        New Arrivals
                      </Nav.Link>
                      <Nav.Link as={Link} to="/products">
                        Shop All
                      </Nav.Link>
                    </div>

                    {/* Column 2 */}
                    <div>
                      <h6
                        style={{
                          color: "#7f6fff",
                          fontWeight: "700",
                          marginBottom: "12px",
                        }}
                      >
                        Shop by Concern
                      </h6>
                      <Nav.Link as={Link} to="/products?concern=Acne">
                        Acne
                      </Nav.Link>
                      <Nav.Link as={Link} to="/products?concern=Hydration">
                        Hydration
                      </Nav.Link>
                      <Nav.Link as={Link} to="/products?concern=Dark Spots">
                        Dark Spots
                      </Nav.Link>
                      <Nav.Link as={Link} to="/products?concern=Wrinkles">
                        Wrinkles
                      </Nav.Link>
                      <Nav.Link as={Link} to="/products?concern=Sunburn">
                        Sunburn
                      </Nav.Link>
                      <Nav.Link as={Link} to="/products?concern=Eczema">
                        Eczema
                      </Nav.Link>
                    </div>

                    {/* Column 3 */}
                    <div>
                      <h6
                        style={{
                          color: "#7f6fff",
                          fontWeight: "700",
                          marginBottom: "12px",
                        }}
                      >
                        Shop by Skin Type
                      </h6>
                      <Nav.Link as={Link} to="/products?skinType=Oily">
                        Oily Skin
                      </Nav.Link>
                      <Nav.Link as={Link} to="/products?skinType=Dry">
                        Dry Skin
                      </Nav.Link>
                      <Nav.Link as={Link} to="/products?skinType=Combination">
                        Combination Skin
                      </Nav.Link>
                      <Nav.Link as={Link} to="/products?skinType=Sensitive">
                        Sensitive Skin
                      </Nav.Link>
                      <Nav.Link as={Link} to="/products?skinType=All">
                        All Skin Types
                      </Nav.Link>
                    </div>

                    {/* Column 4 */}
                    <div>
                      <h6
                        style={{
                          color: "#7f6fff",
                          fontWeight: "700",
                          marginBottom: "12px",
                        }}
                      >
                        Shop by Product
                      </h6>
                      <Nav.Link
                        as={Link}
                        to="/products?productCategory=Cleanser"
                      >
                        Cleansers
                      </Nav.Link>
                      <Nav.Link as={Link} to="/products?productCategory=Serum">
                        Serums
                      </Nav.Link>
                      <Nav.Link
                        as={Link}
                        to="/products?productCategory=Moisturizer"
                      >
                        Moisturizers
                      </Nav.Link>
                      <Nav.Link
                        as={Link}
                        to="/products?productCategory=Sunscreen"
                      >
                        Sunscreens
                      </Nav.Link>
                      <Nav.Link
                        as={Link}
                        to="/products?productCategory=Hydrating Mist"
                      >
                        Hydrating Mists
                      </Nav.Link>
                    </div>
                  </div>

                  {/* Right image and button */}
                  <div
                    style={{
                      textAlign: "center",
                      flexShrink: 0,
                      position: "relative",
                    }}
                  >
                    <img
                      src={shopImage}
                      alt="Shop now"
                      style={{
                        maxWidth: "280px",
                        borderRadius: "12px",
                        marginBottom: "12px",
                        display: "block",
                      }}
                    />
                    <button
                      onClick={handleShopNowClick}
                      style={{
                        backgroundColor: "#7f6fff",
                        color: "#fff",
                        padding: "8px 16px",
                        borderRadius: "20px",
                        border: "none",
                        fontWeight: "600",
                        cursor: "pointer",
                        position: "absolute",
                        bottom: "20px",
                        left: "90px",
                      }}
                    >
                      Shop Now
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <Nav.Link
              as={Link}
              to="/whyvelora"
              style={{ fontWeight: "700", color: "#1d1d44" }}
            >
              Why Us
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/contacts"
              style={{ fontWeight: "700", color: "#1d1d44" }}
            >
              Contacts
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/faq"
              style={{ fontWeight: "700", color: "#1d1d44" }}
            >
              FAQ
            </Nav.Link>

            <Button
              as={Link}
              to="/products"
              style={{
                backgroundColor: "#7f6fff",
                fontWeight: "700",
                border: "none",
                borderRadius: "30px",
                padding: "8px 20px",
              }}
            >
              Find your treatment
            </Button>

            <Nav.Link as={Link} to="/cart" className="position-relative mx-2">
              <CartIcon />
            </Nav.Link>

            {isAuthenticated() ? (
              <>
                <Nav.Link
                  as={Link}
                  to="/profile"
                  style={{
                    fontWeight: "700",
                    color: "#1d1d44",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                  title="Profile"
                >
                  {/* User Icon */}
                  <FaUserCircle size={22} />
                </Nav.Link>
                <Nav.Link
                  onClick={logout}
                  style={{
                    fontWeight: "700",
                    color: "#1d1d44",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                  title="Log Out"
                >
                  {/* Logout Icon */}
                  <FaSignOutAlt size={20} />
                </Nav.Link>
              </>
            ) : (
              <Nav.Link
                as={Link}
                to="/login"
                style={{ fontWeight: "700", color: "#1d1d44" }}
              >
                Log In
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
