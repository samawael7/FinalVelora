import React, { useState } from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import {
  emailValidation,
  passwordValidation,
  nameValidation,
} from "../schema/authValidation";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Image,
} from "react-bootstrap";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaSpinner,
  FaSignInAlt,
  FaClinicMedical,
} from "react-icons/fa";
import { motion } from "framer-motion";
import * as Yup from "yup";
import registerImage from "../assets/360_F_1002573241_XuVsQOCTEYCF3UWO7E3org1BumKfPeaF.jpg"; // Update with your image path

export default function Register() {
  const { register, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      rePassword: "",
    },
    validationSchema: Yup.object({
      firstName: nameValidation,
      lastName: nameValidation,
      email: emailValidation,
      password: passwordValidation,
      rePassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Please confirm your password"),
    }),
    onSubmit: async (values) => {
      await register({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
      });
    },
  });

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const inputVariants = {
    focused: {
      boxShadow: "0 0 0 0.25rem rgba(52, 152, 219, 0.5)",
      borderColor: "#3498db",
    },
  };

  return (
    <Container fluid className="vh-100 p-0">
      <Row className="g-0 h-100">
        {/* Left Side - Image (50%) */}
        <Col md={6} className="d-flex">
          <Image
            src={registerImage}
            alt="Skin care background"
            className="h-100 w-100 object-fit-cover"
            fluid
          />
        </Col>

        {/* Right Side - Form (50%) */}
        <Col
          md={6}
          className="d-flex align-items-center justify-content-center bg-light"
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            className="w-100 px-4 px-md-5"
            style={{ maxWidth: "500px" }}
          >
            <div className="text-center mb-4">
              <FaClinicMedical className="text-primary mb-3" size={48} />
              <h2 className="text-dark mb-1">SkinCare Detector</h2>
              <p className="text-muted">Create Your Account</p>
            </div>

            <h3
              className="text-center mb-4 fw-bold"
              style={{ color: "#2c3e50" }}
            >
              Join Our Community
            </h3>

            <Card className="border-0 shadow-sm">
              <Card.Body className="p-4">
                <Form onSubmit={formik.handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label
                          className="fw-medium"
                          style={{ color: "#34495e" }}
                        >
                          First Name
                        </Form.Label>
                        <motion.div
                          whileFocus="focused"
                          variants={inputVariants}
                        >
                          <div className="input-group">
                            <span className="input-group-text bg-light">
                              <FaUser style={{ color: "#3498db" }} />
                            </span>
                            <Form.Control
                              type="text"
                              name="firstName"
                              placeholder="John"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.firstName}
                              isInvalid={
                                formik.touched.firstName &&
                                !!formik.errors.firstName
                              }
                              className="py-2"
                              style={{
                                transition: "all 0.3s ease",
                                backgroundColor: "#f8f9fa",
                              }}
                            />
                          </div>
                        </motion.div>
                        {formik.touched.firstName &&
                          formik.errors.firstName && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-danger small mt-1"
                            >
                              {formik.errors.firstName}
                            </motion.div>
                          )}
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label
                          className="fw-medium"
                          style={{ color: "#34495e" }}
                        >
                          Last Name
                        </Form.Label>
                        <motion.div
                          whileFocus="focused"
                          variants={inputVariants}
                        >
                          <div className="input-group">
                            <span className="input-group-text bg-light">
                              <FaUser style={{ color: "#3498db" }} />
                            </span>
                            <Form.Control
                              type="text"
                              name="lastName"
                              placeholder="Doe"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.lastName}
                              isInvalid={
                                formik.touched.lastName &&
                                !!formik.errors.lastName
                              }
                              className="py-2"
                              style={{
                                transition: "all 0.3s ease",
                                backgroundColor: "#f8f9fa",
                              }}
                            />
                          </div>
                        </motion.div>
                        {formik.touched.lastName && formik.errors.lastName && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-danger small mt-1"
                          >
                            {formik.errors.lastName}
                          </motion.div>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label
                      className="fw-medium"
                      style={{ color: "#34495e" }}
                    >
                      Email Address
                    </Form.Label>
                    <motion.div whileFocus="focused" variants={inputVariants}>
                      <div className="input-group">
                        <span className="input-group-text bg-light">
                          <FaEnvelope style={{ color: "#3498db" }} />
                        </span>
                        <Form.Control
                          type="email"
                          name="email"
                          placeholder="your@email.com"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.email}
                          isInvalid={
                            formik.touched.email && !!formik.errors.email
                          }
                          className="py-2"
                          style={{
                            transition: "all 0.3s ease",
                            backgroundColor: "#f8f9fa",
                          }}
                        />
                      </div>
                    </motion.div>
                    {formik.touched.email && formik.errors.email && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-danger small mt-1"
                      >
                        {formik.errors.email}
                      </motion.div>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label
                      className="fw-medium"
                      style={{ color: "#34495e" }}
                    >
                      Password
                    </Form.Label>
                    <motion.div whileFocus="focused" variants={inputVariants}>
                      <div className="input-group">
                        <span className="input-group-text bg-light">
                          <FaLock style={{ color: "#3498db" }} />
                        </span>
                        <Form.Control
                          type={showPassword ? "text" : "password"}
                          name="password"
                          placeholder="Enter your password"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.password}
                          isInvalid={
                            formik.touched.password && !!formik.errors.password
                          }
                          className="py-2"
                          style={{
                            transition: "all 0.3s ease",
                            backgroundColor: "#f8f9fa",
                          }}
                        />
                        <button
                          type="button"
                          className="input-group-text bg-light"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          <i
                            className={`fas ${
                              showPassword ? "fa-eye-slash" : "fa-eye"
                            }`}
                            style={{ color: "#7f8c8d" }}
                          ></i>
                        </button>
                      </div>
                    </motion.div>
                    {formik.touched.password && formik.errors.password && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-danger small mt-1"
                      >
                        {formik.errors.password}
                      </motion.div>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label
                      className="fw-medium"
                      style={{ color: "#34495e" }}
                    >
                      Confirm Password
                    </Form.Label>
                    <motion.div whileFocus="focused" variants={inputVariants}>
                      <div className="input-group">
                        <span className="input-group-text bg-light">
                          <FaLock style={{ color: "#3498db" }} />
                        </span>
                        <Form.Control
                          type={showConfirmPassword ? "text" : "password"}
                          name="rePassword"
                          placeholder="Confirm your password"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.rePassword}
                          isInvalid={
                            formik.touched.rePassword &&
                            !!formik.errors.rePassword
                          }
                          className="py-2"
                          style={{
                            transition: "all 0.3s ease",
                            backgroundColor: "#f8f9fa",
                          }}
                        />
                        <button
                          type="button"
                          className="input-group-text bg-light"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          <i
                            className={`fas ${
                              showConfirmPassword ? "fa-eye-slash" : "fa-eye"
                            }`}
                            style={{ color: "#7f8c8d" }}
                          ></i>
                        </button>
                      </div>
                    </motion.div>
                    {formik.touched.rePassword && formik.errors.rePassword && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-danger small mt-1"
                      >
                        {formik.errors.rePassword}
                      </motion.div>
                    )}
                  </Form.Group>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant="primary"
                      type="submit"
                      className="w-100 py-2 rounded-pill fw-bold border-0 mt-2"
                      disabled={loading || !(formik.isValid && formik.dirty)}
                      style={{
                        background:
                          "linear-gradient(135deg, #3498db 0%, #2c3e50 100%)",
                        transition: "all 0.3s ease",
                      }}
                    >
                      {loading ? (
                        <>
                          <FaSpinner className="fa-spin me-2" />
                          Creating Account...
                        </>
                      ) : (
                        "Register Now"
                      )}
                    </Button>
                  </motion.div>
                </Form>

                <div className="text-center mt-4">
                  <p className="mb-0" style={{ color: "#7f8c8d" }}>
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="fw-medium text-decoration-none"
                      style={{ color: "#3498db" }}
                    >
                      <FaSignInAlt className="me-1" /> Sign In
                    </Link>
                  </p>
                </div>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
}
