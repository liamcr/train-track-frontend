import React, { useState } from "react";
import {
  Card,
  CardHeader,
  makeStyles,
  createStyles,
  CardContent,
  TextField,
  Button,
  Typography,
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import ExerciseInputItem from "../components/ExerciseInputItem";
import { Exercise } from "../util/commonTypes";
import axios from "axios";
import { ADD_EXERCISES_URL, ADD_WORKOUT_URL } from "../util/consts";
import PageWrapper from "../components/PageWrapper";
import ToastAlert from "../components/ToastAlert";
import { useCookies } from "react-cookie";

const styles = require("../styles/NewWorkout.module.css");

const useStyles = makeStyles(() =>
  createStyles({
    card: {
      width: "100%",
      maxWidth: "500px",
      margin: 12,
    },
  })
);

const NewWorkout: React.FC = () => {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [exercises, setExercises] = useState<Exercise[]>([
    {
      name: "",
      description: "",
      sets: [{ value: 5, unit: "reps", weight: { unit: "lbs" } }],
    },
  ]);

  const [cookies] = useCookies(["userToken"]);

  const handleDateChange = (date: MaterialUiPickersDate) => {
    setSelectedDate(date);
  };

  const handleAddExercise = () => {
    setExercises((prevVal) => [
      ...prevVal,
      {
        name: "",
        description: "",
        sets: [{ value: 5, unit: "reps", weight: { unit: "lbs" } }],
      },
    ]);
  };

  const handleUpdateExercise = (index: number, updatedExercise: Exercise) => {
    setExercises((prevVal) => {
      let updatedVal = [...prevVal];

      updatedVal[index] = updatedExercise;

      return updatedVal;
    });
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);

    const data = new FormData(event.target as HTMLFormElement);

    const workoutName = data.get("t-t-new-workout-title") as string;
    const workoutDescription = data.get(
      "t-t-new-workout-description"
    ) as string;

    axios
      .post(
        ADD_WORKOUT_URL,
        {
          name: workoutName,
          description: workoutDescription,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.userToken}`,
          },
        }
      )
      .then(async (response) => {
        const newWorkoutId = response.data.workout._id;

        await axios
          .post(
            ADD_EXERCISES_URL,
            {
              workoutId: newWorkoutId,
              exercises: exercises,
            },
            {
              headers: {
                Authorization: `Bearer ${cookies.userToken}`,
              },
            }
          )
          .then((response) => {
            if (response.status === 200) {
              if (typeof window !== "undefined") window.location.href = "/home";
            }
          })
          .catch((err) => {
            if (
              err.response &&
              (err.response.status === 401 || err.response.status === 403)
            ) {
              if (typeof window !== "undefined") window.location.href = "/";
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
          if (typeof window !== "undefined") window.location.href = "/";
        } else {
          setErrorMessage("Something went wrong. Try again later.");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleClose = () => {
    setErrorMessage("");
  };

  return (
    <PageWrapper bottomNavHidden>
      <div className={styles.newWorkoutContainer}>
        <Card className={classes.card}>
          <CardHeader title="New Workout" />
          <CardContent>
            <form onSubmit={onSubmit}>
              <TextField
                label="Title"
                name="t-t-new-workout-title"
                color="primary"
                variant="outlined"
                required
                fullWidth
              />
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  value={selectedDate}
                  onChange={handleDateChange}
                  fullWidth
                  inputVariant="outlined"
                  name="t-t-new-workout-date"
                  margin="normal"
                />
              </MuiPickersUtilsProvider>
              <TextField
                label="Description"
                name="t-t-new-workout-description"
                multiline
                rows={3}
                variant="outlined"
                color="primary"
                margin="normal"
                fullWidth
              />
              <Typography variant="h5">Exercises</Typography>
              <div className={styles.dynamicExerciseContainer}>
                {exercises.map((val, ind) => (
                  <ExerciseInputItem
                    exercise={val}
                    setExercise={(updatedExercise: Exercise) => {
                      handleUpdateExercise(ind, updatedExercise);
                    }}
                    key={ind}
                  />
                ))}
              </div>
              <Button onClick={handleAddExercise} color="primary" size="large">
                + Add Exercise
              </Button>
              <div style={{ height: 12 }} />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isLoading}
                disableElevation
                fullWidth
              >
                Submit
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      <ToastAlert message={errorMessage} type="error" onClose={handleClose} />
    </PageWrapper>
  );
};

export default NewWorkout;
