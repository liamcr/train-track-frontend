import React, { useState } from "react";
import { setAccessToken } from "../util/helperFns";
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
import Header from "../components/Header";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import "../styles/NewWorkout.css";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import ExerciseInputItem from "../components/ExerciseInputItem";
import { Exercise } from "../util/commonTypes";

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
  setAccessToken();

  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [exercises, setExercises] = useState<Exercise[]>([]);

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

      console.log(updatedVal);

      return updatedVal;
    });
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {};

  return (
    <>
      <Header />
      <div className="new-workout-container">
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
              <div className="dynamic-exercise-container">
                {exercises.map((val, ind) => (
                  <ExerciseInputItem
                    exercise={val}
                    setExercise={(updatedExercise: Exercise) => {
                      console.log(updatedExercise);
                      handleUpdateExercise(ind, updatedExercise);
                    }}
                    key={ind}
                  />
                ))}
              </div>
              <Button onClick={handleAddExercise} color="primary" size="large">
                + Add Exercise
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default NewWorkout;
