import React from "react";
import Button from "../components/Button";
import "../styles/LogIn.css";
import LoginCard from "../components/LoginCard";
import Header from "../components/Header";

const LogIn: React.FC = () => {
  return (
    <div className="login-container">
      <Header notLoggedIn>
        <Button
          text="Sign Up"
          size="large"
          onClick={() => {
            window.location.href = "/signup";
          }}
        />
      </Header>
      <div className="login-card-container">
        <LoginCard />
      </div>
    </div>
  );
};

export default LogIn;
