import React from "react";
import { ExerciseSet } from "../util/commonTypes";
import styles from "../styles/NewWorkout.module.css";
import { MenuItem, TextField } from "@material-ui/core";

type SetInputItemProps = {
  exerciseSet: ExerciseSet;
  setSet: (arg0: ExerciseSet) => void;
  isLastSet: boolean;
};

const SetInputItem: React.FC<SetInputItemProps> = ({
  exerciseSet,
  setSet,
  isLastSet,
}) => {
  return (
    <div
      className={`${styles.setInputValues} ${
        !isLastSet ? styles.notLastSetInput : ""
      }`}
    >
      <div className={styles.setInputRow}>
        <TextField
          color="primary"
          type="number"
          required
          style={{ width: "35%" }}
          inputProps={{ min: 0, style: { textAlign: "right" } }}
          value={exerciseSet.value}
          onChange={(e) => {
            let setCopy = { ...exerciseSet };

            setCopy.value = parseInt(e.target.value);

            setSet(setCopy);
          }}
        />
        <TextField
          select
          required
          value={exerciseSet.unit}
          style={{ width: "60%" }}
          onChange={(e) => {
            let setCopy = { ...exerciseSet };

            if (
              e.target.value === "reps" ||
              e.target.value === "seconds" ||
              e.target.value === "minutes"
            ) {
              setCopy.unit = e.target.value;

              setSet(setCopy);
            }
          }}
        >
          <MenuItem value="reps">Reps</MenuItem>
          <MenuItem value="seconds">Seconds</MenuItem>
          <MenuItem value="minutes">Minutes</MenuItem>
        </TextField>
      </div>
      <div className={styles.setInputRow}>
        <TextField
          color="primary"
          type="number"
          margin="normal"
          placeholder="Weight"
          style={{ width: "35%" }}
          inputProps={{
            min: 0,
            style: { textAlign: "right" },
          }}
          value={exerciseSet.weight.value}
          onChange={(e) => {
            let setCopy = { ...exerciseSet };

            setCopy.weight.value = parseInt(e.target.value);

            setSet(setCopy);
          }}
        />
        <TextField
          select
          margin="normal"
          value={exerciseSet.weight.unit}
          style={{ width: "60%" }}
          onChange={(e) => {
            let setCopy = { ...exerciseSet };

            if (e.target.value === "kgs" || e.target.value === "lbs") {
              setCopy.weight.unit = e.target.value;

              setSet(setCopy);
            }
          }}
        >
          <MenuItem value="kgs">kg</MenuItem>
          <MenuItem value="lbs">lbs</MenuItem>
        </TextField>
      </div>
    </div>
  );
};

export default SetInputItem;
