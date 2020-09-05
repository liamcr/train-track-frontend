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
import "../styles/NewWorkout.css";

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
  const [selectedDate, setSelectedDate] = useState(new Date());

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
