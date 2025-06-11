import React, { useEffect } from "react";
import AOS from "aos";

const features = [
  {
    title: "Revitalize Your Skin",
    description:
      "Discover the transformative power of our advanced skin care solutions tailored to your unique needs.",
    image: "/src/assets/feature1.jpg",
    icon: "bi bi-droplet-fill",
  },
  {
    title: "Achieve Radiant Skin",
    description:
      "Unlock the path to luminous, healthy skin with our personalized treatment approaches.",
    image: "/src/assets/feature2.jpg",
    icon: "bi bi-stars",
  },
  {
    title: "Elevate Your Skincare",
    description:
      "Experience the science-backed methods to achieve flawless, healthy skin using our dermatologist.",
    image: "/src/assets/feature3.jpg",
    icon: "bi bi-shield-check",
  },
];

export function FeaturesSection() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
      easing: "ease-in-out",
    });

    window.addEventListener("resize", () => {
      AOS.refresh();
    });

    return () => {
      window.removeEventListener("resize", () => {
        AOS.refresh();
      });
    };
  }, []);

  return (
    <section className="features-section py-5 bg-light">
      <div className="container py-5">
        <div className="row mb-5 text-center" data-aos="fade-up">
          <div className="col-lg-8 mx-auto">
            <h2 className="display-4 fw-bold text-primary mb-3">
              Unlock the Secrets to Flawless Skin
            </h2>
            <p className="lead text-muted">
              Evaluate your skin's health with our AI-powered diagnostic tools
            </p>
            <div className="divider my-4">
              <span className="divider-line bg-primary"></span>
            </div>
          </div>
        </div>

        <div className="row g-4">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="col-md-6 col-lg-4"
              data-aos={idx % 2 === 0 ? "fade-right" : "fade-left"}
              data-aos-delay={idx * 100}
            >
              <div className="card h-100 border-0 shadow-sm feature-card">
                <div className="position-relative overflow-hidden">
                  <img
                    src={feature.image}
                    className="card-img-top feature-img"
                    alt={feature.title}
                  />
                  <div className="overlay-gradient"></div>
                  <div className="feature-icon">
                    <i className={feature.icon}></i>
                  </div>
                </div>
                <div className="card-body text-center p-4">
                  <h3 className="h4 card-title fw-bold text-primary">
                    {feature.title}
                  </h3>
                  <p className="card-text text-muted">{feature.description}</p>
                  <button className="btn btn-primary btn-lg mt-3 rounded-pill px-4 feature-btn w-50">
                    Explore More
                    <i className="bi bi-arrow-right ms-2"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="row mt-5 pt-4" data-aos="zoom-in" data-aos-delay="300">
          <div className="col-12">
            <div className="bg-primary text-white p-5 rounded-lg shadow cta-banner">
              <div className="row align-items-center">
                <div className="col-lg-8 mb-4 mb-lg-0">
                  <h3 className="h2 fw-bold mb-2">
                    Ready for a Skin Transformation?
                  </h3>
                  <p className="mb-0 fs-5 opacity-75">
                    Get a personalized skin assessment today and start your
                    journey.
                  </p>
                </div>
                <div className="col-lg-4 text-lg-end">
                  <button className="btn btn-light btn-lg px-4 fw-bold w-75">
                    Start Assessment
                    <i className="bi bi-check-circle-fill ms-2"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Custom CSS to complement Bootstrap */
        .features-section {
          overflow: hidden;
          position: relative;
          background-color: #f8f9fa;
        }

        .feature-card {
          transition: transform 0.4s ease, box-shadow 0.4s ease;
          border-radius: 12px;
          overflow: hidden;
        }

        .feature-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1) !important;
        }

        .feature-img {
          height: 220px;
          object-fit: cover;
          transition: transform 0.8s ease;
        }

        .feature-card:hover .feature-img {
          transform: scale(1.05);
        }

        .overlay-gradient {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.1),
            rgba(0, 0, 0, 0.4)
          );
          transition: opacity 0.3s ease;
        }

        .feature-card:hover .overlay-gradient {
          opacity: 0.7;
        }

        .feature-icon {
          position: absolute;
          top: 15px;
          right: 15px;
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--bs-primary);
          color: white;
          border-radius: 50%;
          font-size: 1.5rem;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
          transition: transform 0.3s ease;
        }

        .feature-card:hover .feature-icon {
          transform: rotate(15deg) scale(1.1);
        }

        .divider {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .divider-line {
          height: 4px;
          width: 60px;
          border-radius: 2px;
        }

        .feature-btn {
          transition: all 0.3s ease;
          transform: translateY(5px);
          opacity: 0.9;
        }

        .feature-card:hover .feature-btn {
          transform: translateY(0);
          opacity: 1;
        }

        .cta-banner {
          border-radius: 16px;
          background-image: linear-gradient(135deg, #6554e8 0%, #7f6fff 100%);
          position: relative;
          overflow: hidden;
        }

        .cta-banner::before {
          content: "";
          position: absolute;
          top: -50%;
          right: -50%;
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          pointer-events: none;
        }
      `}</style>
    </section>
  );
}

export default FeaturesSection;
