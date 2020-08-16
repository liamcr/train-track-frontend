import React from "react";
import "../styles/LoadingIndicator.css";

type LoadingIndicatorProps = {
  size?: "small" | "medium" | "large" | "xlarge";
  color?: string;
};

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  size = "medium",
  color = "var(--primary)",
}) => {
  return (
    <div
      className={`loading-indicator loader-${size}`}
      style={{ borderTopColor: color }}
    />
  );
};

export default LoadingIndicator;
