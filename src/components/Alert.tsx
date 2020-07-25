import React from "react";
import CloseIcon from "./CloseIcon";
import "../styles/Alert.css";

type AlertProps = {
  message: string;
  type: "success" | "warning" | "danger";
  visible: boolean;
  onClose?: () => void;
};

const Alert: React.FC<AlertProps> = ({ message, type, visible, onClose }) => {
  if (!visible) return null;

  return (
    <div className={`alert alert-${type}`}>
      <div className={`alert-message${onClose ? "-with-close" : ""}`}>
        {message}
      </div>
      {onClose && <CloseIcon onClick={onClose} />}
    </div>
  );
};

export default Alert;
