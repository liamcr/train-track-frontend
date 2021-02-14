import { Typography } from "@material-ui/core";
import React from "react";
import { ExerciseSet } from "../util/commonTypes";
import { formatSet } from "../util/helperFns";

type SetDisplayProps = {
  set: ExerciseSet;
  setIndex: number;
};

const SetDisplay: React.FC<SetDisplayProps> = ({ set, setIndex }) => {
  return (
    <div
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      <Typography
        style={{ marginRight: 16 }}
        variant="h4"
        color="textSecondary"
      >
        {setIndex + 1}
      </Typography>
      <Typography variant="subtitle1" style={{ fontSize: "20px" }}>
        {formatSet(set)}
      </Typography>
    </div>
  );
};

export default SetDisplay;
