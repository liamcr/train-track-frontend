import React from "react";
import { ButtonBase } from "@material-ui/core";
import Image from "next/image";

const styles = require("../styles/Header.module.css");

type HeaderProps = {
  notLoggedIn?: boolean;
  fixed?: boolean;
};

const Header: React.FC<HeaderProps> = ({ notLoggedIn, fixed, children }) => {
  return (
    <div
      className={styles.headerContainer}
      style={{ position: fixed ? "fixed" : "sticky" }}
    >
      <ButtonBase href={notLoggedIn ? "/" : "/home"}>
        <Image
          src="/train-track-init-logo.svg"
          alt="Train Track Logo"
          height={60}
          width={64}
        />
      </ButtonBase>

      <div className={styles.headerTrailingItems}>{children}</div>
    </div>
  );
};

export default Header;
