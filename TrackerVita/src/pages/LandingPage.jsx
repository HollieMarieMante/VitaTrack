import React from "react";
import { useNavigate } from 'react-router-dom';  // Import useNavigate

const LandingPage = () => {
  const navigate = useNavigate();  // Hook to navigate to other pages

  const handleGetStarted = () => {
    navigate('/auth');  // Navigate to the Auth page when 'Get Started' is clicked
  };

  const handleLearnMore = () => {
    navigate('/about');
  };

  return (
    <div style={{ textAlign: "center", padding: "100px" }}>
      <h1 style={{ fontSize: "2.5rem", fontWeight: "bold" }}>
        Track Every Moment.
      </h1>
      <h2 style={{ fontSize: "2rem", fontWeight: "bold", color: "#555" }}>
        Empower Every Choice.
      </h2>
      <p style={{ fontSize: "1.2rem", marginTop: "10px" }}>
        Take control of your life and manage every important moment with ease.
      </p>
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={handleGetStarted}  // Attach navigation to the button
          style={{
            marginRight: "10px",
            padding: "10px 20px",
            fontSize: "1rem",
            background: "black",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Get Started
        </button>
        <button
          onClick={handleLearnMore}  // Attach navigation to the button
          style={{
            padding: "10px 20px",
            fontSize: "1rem",
            background: "transparent",
            border: "2px solid black",
            cursor: "pointer",
          }}
        >
          Learn More
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
