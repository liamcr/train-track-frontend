import React from "react";
import Logo from "../assets/train-track-init-logo.svg";
import "../styles/Header.css";

type HeaderProps = {
  notLoggedIn?: boolean;
};

const Header: React.FC<HeaderProps> = ({ notLoggedIn, children }) => {
  return (
    <div className="header-container">
      <img
        src={Logo}
        alt="Train Track Logo"
        className="train-track-logo"
        onClick={() => {
          window.location.href = notLoggedIn ? "/" : "/timeline";
        }}
      />
      <div className="header-trailing-items">{children}</div>
    </div>
  );
};

export default Header;
