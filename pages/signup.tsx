import React from "react";
import "../styles/SignUp.module.css";
import LoginCard from "../components/LoginCard";
import Header from "../components/Header";
import SEO from "../components/SEO";

const SignUp: React.FC = () => {
  return (
    <div className="signup-container">
      <SEO title="Train Track" />
      <Header notLoggedIn />
      <div className="signup-card-container">
        <LoginCard signup />
      </div>
    </div>
  );
};

export default SignUp;
