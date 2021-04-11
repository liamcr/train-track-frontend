import React, { useState, useEffect, useMemo } from "react";
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
import { Like, ParsedAccessToken, Workout } from "../util/commonTypes";
import {
  LIKE_URL,
  UNLIKE_URL,
  USER_URL,
  WORKOUT_LIKES_URL,
} from "../util/consts";
import axios from "axios";
import Image from "next/image";
import { useCookies } from "react-cookie";
import { Skeleton } from "@material-ui/lab";
import jwtDecode from "jwt-decode";

const styles = require("../styles/FollowerBar.module.css");

type LikeButtonProps = {
  workout: Workout;
};

const LikeButton: React.FC<LikeButtonProps> = ({ workout }) => {
  const [likes, setLikes] = useState<Like[] | null>(null);
  const [liked, setLiked] = useState(workout.liked);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingLikes, setIsLoadingLikes] = useState(false);
  const [likesOpen, setLikesOpen] = useState(false);
  const [userInfo, setUserInfo] = useState<{
    [key: string]: {
      username: string;
      displayImage: string;
    };
  }>({});

  const [cookies] = useCookies(["userToken"]);

  const userId = useMemo(
    () => (jwtDecode(cookies.userToken) as ParsedAccessToken).userId,
    [cookies.userToken]
  );

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

        if (typeof res.data === "string") {
          setLikes((prevState) =>
            prevState === null
              ? null
              : prevState.filter((like) => like.user !== userId)
          );
        } else {
          setLikes((prevState) =>
            prevState === null ? null : [...prevState, res.data as Like]
          );
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
    setIsLoadingLikes(true);

    axios
      .get(WORKOUT_LIKES_URL(workout._id), {
        headers: {
          Authorization: `Bearer ${cookies.userToken}`,
        },
      })
      .then((res) => {
        setLikes(res.data);

        setIsLoadingLikes(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoadingLikes(false);
      });
  }, [workout._id, cookies.userToken]);

  useEffect(() => {
    if (likes !== null) {
      for (let like of likes) {
        if (userInfo[like.user] === undefined) {
          axios
            .get(USER_URL(like.user), {
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
    }
  }, [likes, cookies.userToken]);

  return (
    <>
      <IconButton
        onClick={onLikePressed}
        disabled={isLoading || isLoadingLikes}
        color={liked ? "primary" : "default"}
      >
        <ThumbUpIcon />
      </IconButton>
      <ButtonBase
        style={{ marginLeft: 0, padding: 4 }}
        onClick={() => {
          setLikesOpen(true);
        }}
      >
        {likes === null ? (
          <Skeleton />
        ) : (
          `${likes.length} like${likes.length !== 1 ? "s" : ""}`
        )}
      </ButtonBase>
      <Dialog
        onClose={() => {
          setLikesOpen(false);
        }}
        open={likesOpen}
        fullWidth
      >
        <DialogTitle>Likes</DialogTitle>
        {likes !== null && likes.length > 0 ? (
          <List>
            {likes.map((like) => (
              <ListItem
                button
                onClick={() => {
                  if (typeof window !== "undefined")
                    window.location.href = `/profile/${userId}`;
                }}
                key={like.user}
              >
                <ListItemIcon>
                  {<Avatar src={userInfo[like.user]?.displayImage} />}
                </ListItemIcon>
                <ListItemText
                  primary={
                    userInfo[like.user] ? userInfo[like.user].username : ""
                  }
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
