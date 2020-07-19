import React from "react";
import "../styles/Alert.css";

type AlertProps = {
  message: string;
  type: "success" | "warning" | "danger";
  visible: boolean;
};

const Alert: React.FC<AlertProps> = ({ message, type, visible }) => {
  if (!visible) return null;

  return <div className={`alert alert-${type}`}>{message}</div>;
};

export default Alert;
