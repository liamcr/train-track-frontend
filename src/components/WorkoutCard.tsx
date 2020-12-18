import React, { useContext, useState, useEffect } from "react";
import { Workout, User } from "../util/commonTypes";
import { CacheContext } from "../util/TimelineUserCache";
import axios from "axios";
import { USER_URL } from "../consts";
import {
  Card,
  CardHeader,
  Avatar,
  CardContent,
  CardActions,
  makeStyles,
  createStyles,
  Typography,
  CardActionArea,
  Link,
} from "@material-ui/core";
import { formatDate } from "../util/helperFns";
import LikeButton from "./LikeButton";

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
        <Typography variant="h6">
          <Link
            href={`/workout?id=${workout._id}`}
            color="inherit"
            underline="none"
          >
            {workout.name}
          </Link>
        </Typography>
        {workout.description && (
          <Typography variant="subtitle1">{workout.description}</Typography>
        )}
        <Typography variant="subtitle2">{`${
          workout.exerciseIds.length
        } exercise${workout.exerciseIds.length !== 1 ? "s" : ""}`}</Typography>
      </CardContent>
      <CardActions>
        <LikeButton workout={workout} />
      </CardActions>
    </Card>
  );
};

export default WorkoutCard;
