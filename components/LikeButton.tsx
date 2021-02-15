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
import { LIKE_URL, UNLIKE_URL, USER_URL } from "../util/consts";
import axios from "axios";
import Image from "next/image";
import { useCookies } from "react-cookie";

const styles = require("../styles/FollowerBar.module.css");

type LikeButtonProps = {
  workout: Workout;
};

const LikeButton: React.FC<LikeButtonProps> = ({ workout }) => {
  const [numLikes, setNumLikes] = useState(workout.likes.length);
  const [liked, setLiked] = useState(workout.liked);
  const [isLoading, setIsLoading] = useState(false);
  const [likesOpen, setLikesOpen] = useState(false);
  const [userInfo, setUserInfo] = useState<{
    [key: string]: {
      username: string;
      displayImage: string;
    };
  }>({});

  const [cookies] = useCookies(["userToken"]);

  const onLikePressed = () => {
    setIsLoading(true);

    axios
      .post(
        liked ? UNLIKE_URL(workout._id) : LIKE_URL(workout._id),
        {},
        {
          headers: {
            Authorization: `Bearer ${cookies.userToken}`,
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
              Authorization: `Bearer ${cookies.userToken}`,
            },
          })
          .then((response) => {
            setUserInfo((prevState) => {
              let updatedState = { ...prevState };

              updatedState[response.data._id] = {
                username: response.data.username,
                displayImage: response.data.displayImage,
              };

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
                  if (typeof window !== "undefined")
                    window.location.href = `/profile/${userId}`;
                }}
                key={userId}
              >
                <ListItemIcon>
                  {<Avatar src={userInfo[userId]?.displayImage} />}
                </ListItemIcon>
                <ListItemText
                  primary={userInfo[userId] ? userInfo[userId].username : ""}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <div className={styles.noUsersContainer}>
            <Image
              src="/notFound.svg"
              height={96}
              width={96}
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
