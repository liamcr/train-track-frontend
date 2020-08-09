import React from "react";
import Logo from "../assets/train-track-init-logo.svg";
import "../styles/SignUp.css";
import LoginCard from "../components/LoginCard";

const SignUp: React.FC = () => {
  return (
    <div className="signup-container">
      <div className="signup-header">
        <img
          src={Logo}
          alt="Train Track Logo"
          className="train-track-logo"
          onClick={() => {
            window.location.href = "/";
          }}
        />
      </div>
      <div className="signup-card-container">
        <LoginCard signup />
      </div>
    </div>
  );
};

export default SignUp;
