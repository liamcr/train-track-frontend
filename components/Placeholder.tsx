import React from "react";
import "../styles/Placeholder.css";

type PlaceholderProps = {
  height: number;
  width: number;
  circle?: boolean;
};

const Placeholder: React.FC<PlaceholderProps> = ({ height, width, circle }) => {
  return (
    <div
      className="placeholder"
      style={{
        height,
        width,
        borderRadius: circle ? "50%" : 0,
      }}
    ></div>
  );
};

export default Placeholder;
