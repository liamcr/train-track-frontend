import React from "react";
import "../styles/Input.css";

type InputProps = {
  type: string;
  placeholder: string;
  name: string;
  style?: React.CSSProperties;
};

const Input: React.FC<InputProps> = ({ type, placeholder, name, style }) => {
  return (
    <div className="field" style={style}>
      <input
        type={type}
        name={name}
        className="input"
        placeholder=" "
        maxLength={name === "train-track-username" ? 16 : undefined}
      />
      <label className="label">{placeholder}</label>
    </div>
  );
};

export default Input;
