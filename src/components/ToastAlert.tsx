import { Snackbar, useMediaQuery } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import React from "react";

type AlertProps = {
  message: string;
  type: "success" | "warning" | "error";
  onClose: () => void;
};

const ToastAlert: React.FC<AlertProps> = ({ message, type, onClose }) => {
  const isMobile = useMediaQuery("(max-width: 600px)");

  return (
    <Snackbar
      open={message !== ""}
      anchorOrigin={{
        vertical: "top",
        horizontal: isMobile ? "center" : "right",
      }}
      autoHideDuration={10000}
      onClose={onClose}
    >
      <Alert variant="filled" severity={type} onClose={onClose}>
        {!isMobile && (
          <AlertTitle style={{ textTransform: "capitalize" }}>
            {type}
          </AlertTitle>
        )}
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ToastAlert;
