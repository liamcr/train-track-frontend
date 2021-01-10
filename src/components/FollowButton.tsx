import { Button } from "@material-ui/core";
import axios from "axios";
import React, { useContext, useState } from "react";
import { FOLLOW_URL, UNFOLLOW_URL } from "../consts";
import { FollowersContext } from "../util/FollowerContextProvider";

type FollowButtonProps = {
  initFollowState: boolean;
  userId: string;
};

const FollowButton: React.FC<FollowButtonProps> = ({
  initFollowState,
  userId,
}) => {
  const [followState, setFollowState] = useState(initFollowState);
  const [isLoading, setIsLoading] = useState(false);

  const { state, dispatch } = useContext(FollowersContext);

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
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Button color="primary" onClick={onButtonPressed} disabled={isLoading}>
      {followState ? "- Unfollow" : "+ Follow"}
    </Button>
  );
};

export default FollowButton;
