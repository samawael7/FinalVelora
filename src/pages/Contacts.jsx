import React, { useEffect } from "react";
import { FiPhone, FiMail, FiMapPin, FiSend } from "react-icons/fi";
import { FaUser, FaComment } from "react-icons/fa";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import AOS from "aos";
import "bootstrap/dist/css/bootstrap.min.css";

const Contacts = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required("First name is required")
      .min(2, "Too short")
      .max(50, "Too long"),
    lastName: Yup.string()
      .required("Last name is required")
      .min(2, "Too short")
      .max(50, "Too long"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string()
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(10, "Must be at least 10 digits")
      .max(15, "Must be 15 digits or less"),
    message: Yup.string()
      .required("Message is required")
      .min(10, "Message must be at least 10 characters"),
  });

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await fetch(
        "https://localhost:7182/api/Contacts/submit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            phoneNumber: values.phone,
            message: values.message,
          }),
        }
      );
      const data = await response.json();
      alert(
        data.message || "Thank you for your message! We will contact you soon."
      );
      resetForm();
    } catch {
      alert(
        "There was an error submitting your message. Please try again later."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section style={{ backgroundColor: "#f8f9fa" }}>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center mb-5" data-aos="fade-up">
            <h2 className="display-5 fw-bold mb-3" style={{ color: "#1d1d44" }}>
              Get In Touch
            </h2>
            <p className="lead text-muted">
              Have questions about skin care? Reach out to our dermatology
              experts.
            </p>
          </div>
        </div>

        <div className="row g-5">
          <div className="col-lg-5" data-aos="fade-right">
            <div
              className="card border-0 shadow-sm rounded-4 h-100"
              style={{ backgroundColor: "#6554E8" }}
            >
              <div className="card-body p-4 p-lg-5 text-white">
                <h3 className="h4 mb-4">Contact Information</h3>
                <p className="mb-4 opacity-75">
                  We're here to help with any skin care questions. Reach out via
                  any channel below.
                </p>

                <div className="d-flex mb-4">
                  <div className="bg-white bg-opacity-25 rounded-3 p-3 flex-shrink-0 me-3">
                    <FiPhone className="fs-4" />
                  </div>
                  <div>
                    <h4 className="h6 mb-1">Phone</h4>
                    <a
                      href="tel:+2010123456"
                      className="text-white text-decoration-none"
                    >
                      +2 (010) 123 456
                    </a>
                  </div>
                </div>

                <div className="d-flex mb-4">
                  <div className="bg-white bg-opacity-25 rounded-3 p-3 flex-shrink-0 me-3">
                    <FiMail className="fs-4" />
                  </div>
                  <div>
                    <h4 className="h6 mb-1">Email</h4>
                    <a
                      href="mailto:support@dermacareai.com"
                      className="text-white text-decoration-none"
                    >
                      support@dermacareai.com
                    </a>
                  </div>
                </div>

                <div className="d-flex">
                  <div className="bg-white bg-opacity-25 rounded-3 p-3 flex-shrink-0 me-3">
                    <FiMapPin className="fs-4" />
                  </div>
                  <div>
                    <h4 className="h6 mb-1">Location</h4>
                    <p className="mb-0">Cairo, Egypt</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-7" data-aos="fade-left">
            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body p-4 p-lg-5">
                <h3 className="h4 mb-4" style={{ color: "#1d1d44" }}>
                  Send us a message
                </h3>

                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting, errors, touched }) => (
                    <Form>
                      <div className="row g-3">
                        <div className="col-md-6">
                          <label htmlFor="firstName" className="form-label">
                            <FaUser className="me-2 text-primary" size={14} />
                            First Name
                          </label>
                          <Field
                            type="text"
                            name="firstName"
                            className={`form-control ${
                              touched.firstName && errors.firstName
                                ? "is-invalid"
                                : ""
                            }`}
                            placeholder="John"
                          />
                          <ErrorMessage
                            name="firstName"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>

                        <div className="col-md-6">
                          <label htmlFor="lastName" className="form-label">
                            <FaUser className="me-2 text-primary" size={14} />
                            Last Name
                          </label>
                          <Field
                            type="text"
                            name="lastName"
                            className={`form-control ${
                              touched.lastName && errors.lastName
                                ? "is-invalid"
                                : ""
                            }`}
                            placeholder="Doe"
                          />
                          <ErrorMessage
                            name="lastName"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>

                        <div className="col-12">
                          <label htmlFor="email" className="form-label">
                            <FiMail className="me-2 text-primary" size={14} />
                            Email
                          </label>
                          <Field
                            type="email"
                            name="email"
                            className={`form-control ${
                              touched.email && errors.email ? "is-invalid" : ""
                            }`}
                            placeholder="john@example.com"
                          />
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>

                        <div className="col-12">
                          <label htmlFor="phone" className="form-label">
                            <FiPhone className="me-2 text-primary" size={14} />
                            Phone <span className="text-muted">(Optional)</span>
                          </label>
                          <Field
                            type="tel"
                            name="phone"
                            className={`form-control ${
                              touched.phone && errors.phone ? "is-invalid" : ""
                            }`}
                            placeholder="010-123-4567"
                          />
                          <ErrorMessage
                            name="phone"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>

                        <div className="col-12">
                          <label htmlFor="message" className="form-label">
                            <FaComment
                              className="me-2 text-primary"
                              size={14}
                            />
                            Message
                          </label>
                          <Field
                            as="textarea"
                            name="message"
                            className={`form-control ${
                              touched.message && errors.message
                                ? "is-invalid"
                                : ""
                            }`}
                            rows="5"
                            placeholder="Tell us about your skin care concerns..."
                          />
                          <ErrorMessage
                            name="message"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>

                        <div className="col-12 mt-4">
                          <button
                            type="submit"
                            className="btn btn-primary px-4 py-2 rounded-pill shadow-sm"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? (
                              <span
                                className="spinner-border spinner-border-sm me-2"
                                role="status"
                                aria-hidden="true"
                              ></span>
                            ) : (
                              <FiSend className="me-2" />
                            )}
                            Send Message
                          </button>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacts;
