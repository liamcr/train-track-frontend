import React from "react";
import LoginCard from "../components/LoginCard";
import Header from "../components/Header";
import SEO from "../components/SEO";

const styles = require("../styles/SignUp.module.css");

const SignUp: React.FC = () => {
  return (
    <div className={styles.signupContainer}>
      <SEO title="Train Track" />
      <Header notLoggedIn />
      <div className={styles.signupCardContainer}>
        <LoginCard signup />
      </div>
    </div>
  );
};

export default SignUp;
