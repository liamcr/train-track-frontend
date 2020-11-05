import React from "react";
import { IconButton, TextField, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { Exercise, ExerciseSet } from "../util/commonTypes";
import "../styles/ExerciseInputItem.css";
import SetInputItem from "./SetInputItem";

type ExerciseInputItemProps = {
  exercise: Exercise;
  setExercise: (arg0: Exercise) => void;
};

const ExerciseInputItem: React.FC<ExerciseInputItemProps> = ({
  exercise,
  setExercise,
}) => {
  const onAddSet = () => {
    let updatedExercise = { ...exercise };

    updatedExercise.sets.push({
      value: 5,
      unit: "reps",
      weight: { unit: "lbs" },
    });

    setExercise(updatedExercise);
  };

  const onRemoveSet = () => {
    let updatedExercise = { ...exercise };

    updatedExercise.sets.pop();

    setExercise(updatedExercise);
  };

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
      <Typography variant="h6">Sets</Typography>
      {exercise.sets.map((set, index) => (
        <div className="set-input-list-element">
          <div className="set-list-item-num">{index + 1}</div>
          <SetInputItem
            key={index}
            exerciseSet={set}
            setSet={(updatedSet: ExerciseSet) => {
              let updatedExercise = { ...exercise };

              updatedExercise.sets[index] = updatedSet;

              setExercise(updatedExercise);
            }}
            isLastSet={index === exercise.sets.length - 1}
          />
        </div>
      ))}
      <div className="set-list-management-buttons">
        <IconButton
          color="primary"
          onClick={onAddSet}
          disabled={exercise.sets.length === 25}
        >
          <AddIcon />
        </IconButton>
        <IconButton
          color="primary"
          onClick={onRemoveSet}
          disabled={exercise.sets.length === 1}
        >
          <RemoveIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default ExerciseInputItem;
