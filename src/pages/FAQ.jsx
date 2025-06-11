import React, { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import AOS from "aos";
import "bootstrap/dist/css/bootstrap.min.css";

const FAQ = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "How can I detect skincare issues through your platform?",
      answer:
        "Our AI-powered platform analyzes your skin condition through uploaded images, providing a detailed report with improvement suggestions.",
    },
    {
      question: "Can I get personalized skincare recommendations?",
      answer:
        "Yes! We create customized skincare routines and product suggestions tailored to your skin's unique needs.",
    },
    {
      question: "What skin conditions can the platform detect?",
      answer:
        "We detect acne, eczema, rosacea, psoriasis, and early signs of skin cancer with dermatologist-level accuracy.",
    },
    {
      question: "Is my skin data secure?",
      answer:
        "Absolutely. We use military-grade encryption and strict protocols to protect your personal and skin analysis data.",
    },
    {
      question: "How accurate are the diagnoses?",
      answer:
        "Our technology achieves 98% accuracy, but we always recommend consulting a dermatologist for serious conditions.",
    },
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section
      className="py-5"
      style={{
        backgroundColor: "#f8f9fa",
        marginTop: "90px",
      }}
      id="faq"
    >
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center mb-5" data-aos="fade-up">
            <h2 className="display-5 fw-bold mb-3" style={{ color: "#1d1d44" }}>
              Frequently Asked Questions
            </h2>
            <p className="text-muted lead">
              Everything you need to know about our skin analysis platform
            </p>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="accordion" id="faqAccordion">
              {faqs.map((faq, index) => (
                <div
                  className="accordion-item mb-3 border-0 rounded-4 overflow-hidden shadow-sm"
                  key={index}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <h2 className="accordion-header" id={`heading${index}`}>
                    <button
                      className={`accordion-button ${
                        activeIndex === index ? "" : "collapsed"
                      } d-flex justify-content-between align-items-center`}
                      type="button"
                      onClick={() => toggleAccordion(index)}
                      style={{
                        backgroundColor:
                          activeIndex === index ? "#6554E8" : "#ffffff",
                        color: activeIndex === index ? "#ffffff" : "#1d1d44",
                        fontWeight: "600",
                        fontSize: "1.1rem",
                        padding: "1.25rem 1.5rem",
                        transition: "all 0.3s ease",
                      }}
                    >
                      {faq.question}
                      {activeIndex === index ? (
                        <FaChevronUp className="ms-3" />
                      ) : (
                        <FaChevronDown className="ms-3" />
                      )}
                    </button>
                  </h2>
                  <div
                    id={`collapse${index}`}
                    className={`accordion-collapse collapse ${
                      activeIndex === index ? "show" : ""
                    }`}
                    style={{
                      transition: "height 0.3s ease",
                    }}
                  >
                    <div
                      className="accordion-body"
                      style={{
                        backgroundColor: "#ffffff",
                        color: "#555",
                        lineHeight: "1.7",
                        padding: "1.5rem",
                      }}
                    >
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        className="position-absolute end-0 top-0 d-none d-lg-block"
        style={{
          width: "200px",
          height: "200px",
          background:
            "radial-gradient(circle, rgba(101,84,232,0.1) 0%, rgba(255,255,255,0) 70%)",
          transform: "translate(50%, -50%)",
          zIndex: 0,
        }}
        data-aos="fade-left"
      ></div>
    </section>
  );
};

export default FAQ;
