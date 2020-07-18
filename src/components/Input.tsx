import React from "react";
import "../styles/Input.css";

type InputProps = {
  type: string;
  placeholder: string;
  name: string;
};

const Input: React.FC<InputProps> = ({ type, placeholder, name }) => {
  return (
    <div className="field">
      <input type={type} name={name} className="input" placeholder=" " />
      <label className="label">{placeholder}</label>
    </div>
  );
};

export default Input;
