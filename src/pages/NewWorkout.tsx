import React, { useState } from "react";
import { setAccessToken } from "../util/helperFns";
import {
  Card,
  CardHeader,
  makeStyles,
  createStyles,
  CardContent,
  TextField,
} from "@material-ui/core";
import Header from "../components/Header";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import "../styles/NewWorkout.css";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";

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

  const handleDateChange = (date: MaterialUiPickersDate) => {
    setSelectedDate(date);
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
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default NewWorkout;
