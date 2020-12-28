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
import { setAccessToken } from "../util/helperFns";
import "../styles/WorkoutPage.css";
import LikeButton from "../components/LikeButton";
import WorkoutCardHeader from "../components/WorkoutCardHeader";
import ExerciseList from "../components/ExerciseList";
import PageWrapper from "../components/PageWrapper";

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
            });
        });
    }
  }, []);

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
    </PageWrapper>
  );
};

export default WorkoutPage;
