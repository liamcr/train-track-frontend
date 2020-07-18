import React, { CSSProperties } from "react";
import "../styles/Card.css";

type CardProps = {
  style?: CSSProperties;
};

const Card: React.FC<CardProps> = ({ style, children }) => {
  return (
    <div className="card-container" style={style}>
      {children}
    </div>
  );
};

export default Card;
