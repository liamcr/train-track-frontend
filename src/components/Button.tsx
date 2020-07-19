import React, { CSSProperties } from "react";
import "../styles/Button.css";

type ButtonProps = {
  text: string;
  onClick?: () => void;
  size?: "small" | "medium" | "large";
  style?: CSSProperties;
};

const Button: React.FC<ButtonProps> = ({ text, onClick, size, style }) => {
  // Size defaults to medium
  size = size ? size : "medium";

  return (
    <button
      className={`button-container button-size-${size}`}
      style={style}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
