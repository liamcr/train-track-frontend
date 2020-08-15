import React from "react";
import "../styles/FloatingActionButton.css";

type FloatingActionButtonProps = {
  onClick?: () => void;
};

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onClick,
}) => {
  return (
    <div className="floating-action-button" onClick={onClick}>
      +
    </div>
  );
};

export default FloatingActionButton;
