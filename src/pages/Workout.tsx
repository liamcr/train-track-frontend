import {
  Card,
  CardActions,
  CircularProgress,
  createStyles,
  makeStyles,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { GET_EXERCISE_URL, WORKOUT_URL } from "../consts";
import { Exercise, Workout } from "../util/commonTypes";
import "../styles/WorkoutPage.css";
import LikeButton from "../components/LikeButton";
import WorkoutCardHeader from "../components/WorkoutCardHeader";
import ExerciseList from "../components/ExerciseList";
import PageWrapper from "../components/PageWrapper";
import ToastAlert from "../components/ToastAlert";

const useStyles = makeStyles(() =>
  createStyles({
    workoutCard: {
      padding: 16,
      marginBottom: 12,
    },
  })
);

const WorkoutPage: React.FC = () => {
  const classes = useStyles();

  const [errorMessage, setErrorMessage] = useState("");
  const [workoutData, setWorkoutData] = useState<Workout | null>(null);
  const [exercises, setExercises] = useState<Exercise[] | null>(null);

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
            .get(GET_EXERCISE_URL(response.data.exerciseIds.join()), {
              headers: {
                Authorization: `Bearer ${localStorage.getItem(
                  "train-track-access-token"
                )}`,
              },
            })
            .then((response) => {
              setExercises(response.data);
            })
            .catch((err) => {
              if (
                err.response &&
                (err.response.status === 401 || err.response.status === 403)
              ) {
                window.location.href = "/";
              } else if (err.response && err.response.status === 404) {
                setErrorMessage(err.response.data);
              } else {
                setErrorMessage("Something went wrong. Try again later.");
              }
            });
        })
        .catch((err) => {
          if (
            err.response &&
            (err.response.status === 401 || err.response.status === 403)
          ) {
            window.location.href = "/";
          } else if (err.response && err.response.status === 404) {
            setErrorMessage(err.response.data);
          } else {
            setErrorMessage("Something went wrong. Try again later.");
          }
        });
    }
  }, []);

  const handleClose = () => {
    setErrorMessage("");
  };

  return (
    <PageWrapper bottomNavHidden>
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
              <Typography variant="h4" style={{ marginTop: 32 }}>
                Exercises
              </Typography>
              {exercises !== null && <ExerciseList exercises={exercises} />}
              <CardActions>
                <LikeButton workout={workoutData} />
              </CardActions>
            </>
          )}
        </Card>
      </div>
      <ToastAlert message={errorMessage} type="error" onClose={handleClose} />
    </PageWrapper>
  );
};

export default WorkoutPage;
