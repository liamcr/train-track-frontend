import React from "react";
import "../styles/CloseIcon.css";

type CloseIconProps = {
  onClick?: () => void;
};

const CloseIcon: React.FC<CloseIconProps> = ({ onClick }) => {
  return (
    <div className="close-icon-container" onClick={onClick}>
      x
    </div>
  );
};

export default CloseIcon;
