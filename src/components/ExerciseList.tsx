import { List, ListItem } from "@material-ui/core";
import React from "react";
import { Exercise } from "../util/commonTypes";
import ExerciseDisplay from "./ExerciseDisplay";

type ExerciseListProps = {
  exercises: Exercise[];
};

const ExerciseList: React.FC<ExerciseListProps> = ({ exercises }) => {
  return (
    <List>
      {exercises.map((exercise, i) => (
        <ListItem key={i} divider>
          <ExerciseDisplay exercise={exercise} />
        </ListItem>
      ))}
    </List>
  );
};

export default ExerciseList;
