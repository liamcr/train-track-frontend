import React from "react";
import Logo from "../assets/train-track-init-logo.svg";
import "../styles/Header.module.css";
import { ButtonBase } from "@material-ui/core";

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
                <img
                    src={Logo}
                    alt="Train Track Logo"
                    className="train-track-logo"
                />
            </ButtonBase>

            <div className="header-trailing-items">{children}</div>
        </div>
    );
};

export default Header;
