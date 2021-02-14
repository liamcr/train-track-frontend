import React from "react";
import Logo from "../assets/train-track-init-logo.svg";
import "../styles/Header.module.css";
import { ButtonBase } from "@material-ui/core";
import Image from "next/image";

type HeaderProps = {
  notLoggedIn?: boolean;
  fixed?: boolean;
};

const Header: React.FC<HeaderProps> = ({ notLoggedIn, fixed, children }) => {
  return (
    <div
      className="header-container"
      style={{ position: fixed ? "fixed" : "sticky" }}
    >
      <ButtonBase href={notLoggedIn ? "/" : "/home"}>
        <Image src={Logo} alt="Train Track Logo" height={60} width={64} />
      </ButtonBase>

      <div className="header-trailing-items">{children}</div>
    </div>
  );
};

export default Header;
