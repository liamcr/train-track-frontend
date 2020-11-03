import React from "react";
import { TextField } from "@material-ui/core";
import { Exercise } from "../util/commonTypes";
import "../styles/ExerciseInputItem.css";

type ExerciseInputItemProps = {
  exercise: Exercise;
  setExercise: (arg0: Exercise) => void;
};

const ExerciseInputItem: React.FC<ExerciseInputItemProps> = ({
  exercise,
  setExercise,
}) => {
  return (
    <div className="exercise-input-container">
      <TextField
        label="Name"
        color="primary"
        required
        fullWidth
        value={exercise.name}
        onChange={(e) => {
          let exerciseCopy = { ...exercise };

          exerciseCopy.name = e.target.value;

          setExercise(exerciseCopy);
        }}
      />
      <TextField
        label="Description"
        color="primary"
        fullWidth
        margin="normal"
        value={exercise.description}
        onChange={(e) => {
          let exerciseCopy = { ...exercise };

          exerciseCopy.description = e.target.value;

          setExercise(exerciseCopy);
        }}
      />
    </div>
  );
};

export default ExerciseInputItem;
