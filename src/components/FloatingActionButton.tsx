import React from "react";
import AddIcon from "../assets/icons/add.svg";
import "../styles/FloatingActionButton.css";

type FloatingActionButtonProps = {
  onClick?: () => void;
};

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onClick,
}) => {
  return (
    <div className="floating-action-button" onClick={onClick}>
      <img src={AddIcon} alt="Add workout" className="add-icon" />
    </div>
  );
};

export default FloatingActionButton;
