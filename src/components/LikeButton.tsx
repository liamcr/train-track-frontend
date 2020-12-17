import React, { useState, useEffect } from "react";
import {
  Avatar,
  ButtonBase,
  Dialog,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import { Workout } from "../util/commonTypes";
import { LIKE_URL, UNLIKE_URL, USER_URL } from "../consts";
import axios from "axios";
import NotFoundIcon from "../assets/icons/notFound.svg";

type LikeButtonProps = {
  workout: Workout;
};

const LikeButton: React.FC<LikeButtonProps> = ({ workout }) => {
  const [numLikes, setNumLikes] = useState(workout.likes.length);
  const [liked, setLiked] = useState(workout.liked);
  const [isLoading, setIsLoading] = useState(false);
  const [likesOpen, setLikesOpen] = useState(false);
  const [userDisplayNames, setUserDisplayNames] = useState<{
    [key: string]: string;
  }>({});

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

  useEffect(() => {
    if (workout.likes) {
      for (let userId of workout.likes) {
        axios
          .get(USER_URL(userId), {
            headers: {
              Authorization: `Bearer ${localStorage.getItem(
                "train-track-access-token"
              )}`,
            },
          })
          .then((response) => {
            setUserDisplayNames((prevState) => {
              let updatedState = { ...prevState };

              updatedState[response.data._id] = response.data.username;

              return updatedState;
            });
          })
          .catch((err) => {
            console.error(err);
          });
      }
    }
  }, [workout.likes]);

  return (
    <>
      <IconButton
        onClick={onLikePressed}
        disabled={isLoading}
        color={liked ? "primary" : "default"}
      >
        <ThumbUpIcon />
      </IconButton>
      <ButtonBase
        style={{ marginLeft: 0, padding: 4 }}
        onClick={() => {
          setLikesOpen(true);
        }}
      >{`${numLikes} like${numLikes !== 1 ? "s" : ""}`}</ButtonBase>
      <Dialog
        onClose={() => {
          setLikesOpen(false);
        }}
        open={likesOpen}
        fullWidth
      >
        <DialogTitle>Likes</DialogTitle>
        {workout.likes.length > 0 ? (
          <List>
            {workout.likes.map((userId) => (
              <ListItem
                button
                onClick={() => {
                  window.location.href = `/profile?id=${userId}`;
                }}
                key={userId}
              >
                <ListItemIcon>
                  <Avatar>
                    {userDisplayNames[userId]
                      ? userDisplayNames[userId][0]
                      : ""}
                  </Avatar>
                </ListItemIcon>
                <ListItemText
                  primary={
                    userDisplayNames[userId] ? userDisplayNames[userId] : ""
                  }
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <div className="no-users-container">
            <img
              src={NotFoundIcon}
              className="not-found-icon"
              alt="No workouts found"
            />
            No users found.
          </div>
        )}
      </Dialog>
    </>
  );
};

export default LikeButton;
