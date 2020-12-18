import {
  Avatar,
  Card,
  CardActions,
  Chip,
  CircularProgress,
  createStyles,
  Divider,
  makeStyles,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { USER_URL, WORKOUT_URL } from "../consts";
import { FullUser, Workout } from "../util/commonTypes";
import { formatDate, setAccessToken } from "../util/helperFns";
import "../styles/WorkoutPage.css";
import LikeButton from "../components/LikeButton";
import WorkoutCardHeader from "../components/WorkoutCardHeader";

const useStyles = makeStyles(() =>
  createStyles({
    workoutCard: {
      padding: 16,
    },
  })
);

const WorkoutPage: React.FC = () => {
  setAccessToken();

  const classes = useStyles();

  const [workoutData, setWorkoutData] = useState<Workout | null>(null);
  const [userData, setUserData] = useState<FullUser | null>(null);

  useEffect(() => {
    const idSearchParam = new URL(window.location.href).searchParams.get("id");

    if (idSearchParam === null) {
      window.location.href = "/home";
    } else {
      axios
        .get(WORKOUT_URL(idSearchParam), {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "train-track-access-token"
            )}`,
          },
        })
        .then((response) => {
          setWorkoutData(response.data);

          axios
            .get(USER_URL(response.data.user), {
              headers: {
                Authorization: `Bearer ${localStorage.getItem(
                  "train-track-access-token"
                )}`,
              },
            })
            .then((userResponse) => {
              setUserData(userResponse.data);
            });
        });
    }
  }, []);

  return (
    <>
      <Header fixed />
      <div className="workout-card-container">
        <Card className={classes.workoutCard}>
          {workoutData === null ? (
            <CircularProgress color="primary" />
          ) : (
            <>
              <WorkoutCardHeader workoutData={workoutData} />
              {workoutData.description && (
                <Typography variant="body1">
                  {workoutData.description}
                </Typography>
              )}
              <CardActions>
                <LikeButton workout={workoutData} />
              </CardActions>
            </>
          )}
        </Card>
      </div>
    </>
  );
};

export default WorkoutPage;
