import React from "react";
import CloseIconImg from "../assets/alertClose.png";
import "../styles/CloseIcon.css";

type CloseIconProps = {
  onClick?: () => void;
};

const CloseIcon: React.FC<CloseIconProps> = ({ onClick }) => {
  return (
    <div className="close-icon-container" onClick={onClick}>
      <img className="close-icon" src={CloseIconImg} alt="Close Alert" />
    </div>
  );
};

export default CloseIcon;
