import React, { useState } from "react";
import { IconButton } from "@material-ui/core";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import { Workout } from "../util/commonTypes";
import { LIKE_URL, UNLIKE_URL } from "../consts";
import axios from "axios";

type LikeButtonProps = {
  workout: Workout;
};

const LikeButton: React.FC<LikeButtonProps> = ({ workout }) => {
  const [numLikes, setNumLikes] = useState(workout.likes.length);
  const [liked, setLiked] = useState(workout.liked);
  const [isLoading, setIsLoading] = useState(false);

  const onLikePressed = () => {
    setIsLoading(true);

    axios
      .post(
        liked ? UNLIKE_URL(workout._id) : LIKE_URL(workout._id),
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "train-track-access-token"
            )}`,
          },
        }
      )
      .then((res) => {
        setLiked((prevState) => !prevState);

        if (res.data.includes("unliked")) {
          setNumLikes((prevState) => prevState - 1);
        } else {
          setNumLikes((prevState) => prevState + 1);
        }
      })
      .catch((err) => {
        console.error(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <IconButton
        onClick={onLikePressed}
        disabled={isLoading}
        color={liked ? "primary" : "default"}
      >
        <ThumbUpIcon />
      </IconButton>
      {`${numLikes} like${numLikes !== 1 ? "s" : ""}`}
    </>
  );
};

export default LikeButton;
