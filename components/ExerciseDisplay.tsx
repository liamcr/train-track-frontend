import { List, ListItem, ListSubheader, Typography } from "@material-ui/core";
import React from "react";
import { Exercise } from "../util/commonTypes";
import SetDisplay from "./SetDisplay";

type ExerciseDisplayProps = {
  exercise: Exercise;
};

const ExerciseDisplay: React.FC<ExerciseDisplayProps> = ({ exercise }) => {
  return (
    <div>
      <Typography variant="h6">{exercise.name}</Typography>
      {exercise.description && (
        <Typography variant="subtitle1" color="textSecondary">
          {exercise.description}
        </Typography>
      )}
      <List subheader={<ListSubheader>Sets</ListSubheader>}>
        {exercise.sets.map((set, i) => (
          <ListItem key={i}>
            <SetDisplay set={set} setIndex={i} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ExerciseDisplay;
