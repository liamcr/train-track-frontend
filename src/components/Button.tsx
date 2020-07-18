import React, { CSSProperties } from "react";
import "../styles/Button.css";

type ButtonProps = {
  text: string;
  href?: string;
  size?: "small" | "medium" | "large";
  style?: CSSProperties;
};

const Button: React.FC<ButtonProps> = ({ text, href, size, style }) => {
  // Size defaults to medium
  size = size ? size : "medium";

  return (
    <a
      className={`button-container button-size-${size}`}
      style={style}
      href={href}
    >
      {text}
    </a>
  );
};

export default Button;
