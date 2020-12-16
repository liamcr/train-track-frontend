import React, { useContext, useState, useEffect } from "react";
import { Workout, User } from "../util/commonTypes";
import { CacheContext } from "../util/TimelineUserCache";
import axios from "axios";
import { LIKE_URL, UNLIKE_URL, USER_URL } from "../consts";
import {
  Card,
  CardHeader,
  Avatar,
  CardContent,
  CardActions,
  IconButton,
  makeStyles,
  createStyles,
  Typography,
  CardActionArea,
} from "@material-ui/core";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import { formatDate } from "../util/helperFns";

type WorkoutCardProps = {
  workout: Workout;
};

const useStyles = makeStyles(() =>
  createStyles({
    workoutCard: {
      width: "100%",
      maxWidth: "500px",
      margin: 12,
    },
  })
);

const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout }) => {
  const { state, dispatch } = useContext(CacheContext);
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [numLikes, setNumLikes] = useState(workout.likes.length);
  const [liked, setLiked] = useState(workout.liked);
  const [isLoading, setIsLoading] = useState(false);

  const classes = useStyles();

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
    if (state[workout.user] !== undefined && userInfo === null) {
      setUserInfo(state[workout.user]);
    } else if (state[workout.user] === undefined) {
      axios
        .get(USER_URL(workout.user), {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "train-track-access-token"
            )}`,
          },
        })
        .then((response) => {
          dispatch({
            type: "ADD_USER",
            payload: {
              userId: response.data._id,
              displayName: response.data.username,
            },
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [state, workout.user, dispatch, userInfo]);

  return (
    <Card className={classes.workoutCard}>
      <CardActionArea href={`/profile?id=${workout.user}`}>
        <CardHeader
          avatar={
            <Avatar>{userInfo !== null ? userInfo.displayName[0] : ""}</Avatar>
          }
          title={userInfo !== null ? userInfo.displayName : ""}
          subheader={formatDate(workout.date)}
        />
      </CardActionArea>
      <CardContent>
        <Typography variant="h6">{workout.name}</Typography>
        {workout.description && (
          <Typography variant="subtitle1">{workout.description}</Typography>
        )}
        <Typography variant="subtitle2">{`${
          workout.exerciseIds.length
        } exercise${workout.exerciseIds.length !== 1 ? "s" : ""}`}</Typography>
      </CardContent>
      <CardActions>
        <IconButton
          onClick={onLikePressed}
          disabled={isLoading}
          color={liked ? "primary" : "default"}
        >
          <ThumbUpIcon />
        </IconButton>
        {`${numLikes} like${numLikes !== 1 ? "s" : ""}`}
      </CardActions>
    </Card>
  );
};

export default WorkoutCard;
