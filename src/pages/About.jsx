import React from "react";
import aboutImage from "../assets/about-image.png"; // Make sure this path is correct

const About = () => {
  const styles = {
    section: {
      padding: "4rem 2rem",
      background: "#f9f9f9",
      fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
    },
    container: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "space-between",
      maxWidth: "1200px",
      margin: "0 auto",
      gap: "2rem",
    },
    text: {
      flex: 1,
      minWidth: "300px",
    },
    heading: {
      fontSize: "2.5rem",
      marginBottom: "1rem",
      color: "#2c3e50",
    },
    highlight: {
      color: "#5a0d17",
    },
    paragraph: {
      fontSize: "1.1rem",
      lineHeight: "1.8",
      color: "#555",
      marginBottom: "1rem",
    },
    imageContainer: {
      flex: 1,
      display: "flex",
      justifyContent: "center",
      minWidth: "300px",
    },
    image: {
      maxWidth: "100%",
      height: "auto",
      borderRadius: "1rem",
      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
      transition: "transform 0.3s ease",
    },
    "@media": {
      container: {
        flexDirection: "column-reverse",
        textAlign: "center",
      },
      heading: {
        fontSize: "2rem",
      },
      paragraph: {
        fontSize: "1rem",
      },
    },
  };

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.text}>
          <h1 style={styles.heading}>
            About <span style={styles.highlight}>Dermacare</span>
          </h1>
          <p style={styles.paragraph}>
            At Dermacare, we blend advanced AI and machine learning to
            revolutionize skincare. Upload your skin images, detect conditions,
            and get personalized product recommendations—all in one place.
          </p>
          <p style={styles.paragraph}>
            We don’t just care for your skin, we <strong>understand</strong> it.
            ❤️
          </p>
        </div>

        <div style={styles.imageContainer}>
          <img
            src={aboutImage}
            alt="About Dermacare"
            style={styles.image}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "scale(1.03)")
            }
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
          />
        </div>
      </div>
    </section>
  );
};

export default About;
