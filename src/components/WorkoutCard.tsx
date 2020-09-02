import React, { useContext, useState, useEffect } from "react";
import { Workout, User } from "../util/commonTypes";
import { CacheContext } from "../util/TimelineUserCache";
import axios from "axios";
import { USER_URL } from "../consts";
import "../styles/WorkoutCard.css";
import {
  Card,
  CardHeader,
  Avatar,
  CardContent,
  CardActions,
  IconButton,
  makeStyles,
  createStyles,
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

  const classes = useStyles();

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
      <CardHeader
        avatar={
          <Avatar>{userInfo !== null ? userInfo.displayName[0] : ""}</Avatar>
        }
        title={userInfo !== null ? userInfo.displayName : ""}
        subheader={formatDate(workout.date)}
      />
      <CardContent>
        <div className="workout-title">{workout.name}</div>
        {workout.description && (
          <div className="workout-description">{workout.description}</div>
        )}
        <div className="exercise-count">{`${
          workout.exerciseIds.length
        } exercise${workout.exerciseIds.length !== 1 ? "s" : ""}`}</div>
      </CardContent>
      <CardActions>
        <IconButton>
          <ThumbUpIcon />
        </IconButton>
        {`${workout.likes.length} like${workout.likes.length !== 1 ? "s" : ""}`}
      </CardActions>
    </Card>
  );
};

export default WorkoutCard;
