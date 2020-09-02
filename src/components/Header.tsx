import React from "react";
import Logo from "../assets/train-track-init-logo.svg";
import "../styles/Header.css";
import { ButtonBase } from "@material-ui/core";

type HeaderProps = {
  notLoggedIn?: boolean;
};

const Header: React.FC<HeaderProps> = ({ notLoggedIn, children }) => {
  return (
    <div className="header-container">
      <ButtonBase href={notLoggedIn ? "/" : "/timeline"}>
        <img src={Logo} alt="Train Track Logo" className="train-track-logo" />
      </ButtonBase>

      <div className="header-trailing-items">{children}</div>
    </div>
  );
};

export default Header;
