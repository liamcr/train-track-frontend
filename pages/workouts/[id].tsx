import {
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  createStyles,
  makeStyles,
  Typography,
} from "@material-ui/core";
import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import {
  GET_EXERCISE_URL,
  WORKOUT_COMMENTS_URL,
  WORKOUT_EXERCISES_URL,
  WORKOUT_URL,
} from "../../util/consts";
import { Exercise, Workout, Comment } from "../../util/commonTypes";
import LikeButton from "../../components/LikeButton";
import WorkoutCardHeader from "../../components/WorkoutCardHeader";
import ExerciseList from "../../components/ExerciseList";
import PageWrapper from "../../components/PageWrapper";
import ToastAlert from "../../components/ToastAlert";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getAccessToken } from "../../util/helperFns";
import CommentSection from "../../components/CommentSection";
import { TimelineProvider } from "../../util/TimelineUserCache";
import { useCookies } from "react-cookie";
import { updateNonNullExpression } from "typescript";

const styles = require("../../styles/WorkoutPage.module.css");

const useStyles = makeStyles(() =>
  createStyles({
    workoutCard: {
      marginBottom: 12,
    },
  })
);

const WorkoutPage: React.FC = ({
  workout,
  exercises,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const classes = useStyles();

  const [errorMessage, setErrorMessage] = useState(error);
  const [comments, setComments] = useState<Comment[]>([]);

  const [cookies] = useCookies(["userToken"]);

  const handleClose = () => {
    setErrorMessage("");
  };

  useEffect(() => {
    if (!error) {
      axios
        .get(WORKOUT_COMMENTS_URL(workout._id), {
          headers: {
            Authorization: `Bearer ${cookies.userToken}`,
          },
        })
        .then((response) => {
          setComments(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [cookies.userToken]);

  return (
    <PageWrapper bottomNavHidden>
      <div className={styles.workoutCardContainer}>
        <Card className={classes.workoutCard}>
          {workout === null ? (
            <CircularProgress color="primary" />
          ) : (
            <>
              <CardContent>
                <WorkoutCardHeader workoutData={workout} />
                {workout.description && (
                  <Typography variant="body1">{workout.description}</Typography>
                )}
                <Typography variant="h4" style={{ marginTop: 32 }}>
                  Exercises
                </Typography>
                {exercises !== null && <ExerciseList exercises={exercises} />}
              </CardContent>
              <CardActions>
                <LikeButton workout={workout} />
              </CardActions>
              <TimelineProvider>
                <CommentSection
                  workout={workout}
                  comments={comments}
                  setComments={setComments}
                />
              </TimelineProvider>
            </>
          )}
        </Card>
      </div>
      <ToastAlert message={errorMessage} type="error" onClose={handleClose} />
    </PageWrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;

  if (typeof id !== "string") {
    return {
      redirect: {
        destination: "/home",
        permanent: false,
      },
    };
  }

  try {
    const workoutRes = await axios.get(WORKOUT_URL(id), {
      headers: {
        Authorization: `Bearer ${getAccessToken(context.req)}`,
      },
    });

    const workoutData = workoutRes.data as Workout;

    const exercisesRes = await axios.get(
      WORKOUT_EXERCISES_URL(workoutData._id),
      {
        headers: {
          Authorization: `Bearer ${getAccessToken(context.req)}`,
        },
      }
    );

    const exercisesData = exercisesRes.data as Exercise;

    return {
      props: {
        workout: workoutData,
        exercises: exercisesData,
        error: "",
      },
    };
  } catch (error) {
    return {
      props: {
        workout: null,
        exercises: null,
        error: (error as AxiosError).message,
      },
    };
  }
};

export default WorkoutPage;
