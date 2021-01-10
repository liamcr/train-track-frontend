import { Paper } from "@material-ui/core";
import React from "react";
import { Workout } from "../util/commonTypes";
import CommentInput from "./CommentInput";

type CommentSectionProps = {
  workout: Workout;
};

const CommentSection: React.FC<CommentSectionProps> = ({ workout }) => {
  return (
    <Paper
      square
      style={{
        backgroundColor: "rgb(60, 60, 60)",
        padding: 8,
      }}
    >
      <CommentInput workout={workout} />
    </Paper>
  );
};

export default CommentSection;
