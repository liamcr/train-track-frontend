import React, { CSSProperties } from "react";
import "../styles/Button.css";

type ButtonProps = {
  text: string;
  onClick?: () => void;
  size?: "small" | "medium" | "large";
  loading?: boolean;
  disabled?: boolean;
  style?: CSSProperties;
};

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  size,
  loading,
  disabled,
  style,
}) => {
  // Size defaults to medium
  size = size ? size : "medium";

  return (
    <button
      className={`
        button-container
        button-size-${size} 
        ${loading ? `loader-size-${size}` : ""}
        ${disabled ? `button-disabled` : ""}
      `}
      disabled={disabled}
      style={style}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
