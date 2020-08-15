import React from "react";
import "../styles/SignUp.css";
import LoginCard from "../components/LoginCard";
import Header from "../components/Header";

const SignUp: React.FC = () => {
  return (
    <div className="signup-container">
      <Header notLoggedIn />
      <div className="signup-card-container">
        <LoginCard signup />
      </div>
    </div>
  );
};

export default SignUp;
