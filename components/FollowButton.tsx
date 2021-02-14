import { Button } from "@material-ui/core";
import axios from "axios";
import React, { useContext, useState } from "react";
import { FOLLOW_URL, UNFOLLOW_URL } from "../consts";
import { FollowersContext } from "../util/FollowerContextProvider";
import ToastAlert from "./ToastAlert";

type FollowButtonProps = {
  initFollowState: boolean;
  userId: string;
};

const FollowButton: React.FC<FollowButtonProps> = ({
  initFollowState,
  userId,
}) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [followState, setFollowState] = useState(initFollowState);
  const [isLoading, setIsLoading] = useState(false);

  const { dispatch } = useContext(FollowersContext);

  const onButtonPressed = () => {
    setIsLoading(true);

    axios
      .post(
        followState ? UNFOLLOW_URL(userId) : FOLLOW_URL(userId),
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "train-track-access-token"
            )}`,
          },
        }
      )
      .then(() => {
        followState
          ? dispatch({ type: "UNFOLLOW" })
          : dispatch({ type: "FOLLOW" });
        setFollowState((prevState) => !prevState);
      })
      .catch((err) => {
        if (
          err.response &&
          (err.response.status === 401 || err.response.status === 403)
        ) {
          window.location.href = "/";
        } else if (
          err.response &&
          (err.response.status === 400 || err.response.status === 404)
        ) {
          setErrorMessage(err.response.data);
        } else {
          setErrorMessage("Something went wrong. Try again later.");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleClose = () => {
    setErrorMessage("");
  };

  return (
    <>
      <Button color="primary" onClick={onButtonPressed} disabled={isLoading}>
        {followState ? "- Unfollow" : "+ Follow"}
      </Button>
      <ToastAlert message={errorMessage} type="error" onClose={handleClose} />
    </>
  );
};

export default FollowButton;
