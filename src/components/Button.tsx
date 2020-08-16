import React, { CSSProperties } from "react";
import "../styles/Button.css";
import LoadingIndicator from "./LoadingIndicator";

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
  size = "medium",
  loading,
  disabled,
  style,
}) => {
  const loadingIndicatorWidths = {
    small: 20,
    medium: 26,
    large: 32,
    xlarge: 80,
  };

  return (
    <button
      className={`
        button-container
        button-size-${size}
      `}
      disabled={disabled}
      style={style}
      onClick={onClick}
    >
      {loading && <LoadingIndicator size={size} color="white" />}
      {text}
      {loading && <div style={{ width: loadingIndicatorWidths[size] }} />}
    </button>
  );
};

export default Button;
