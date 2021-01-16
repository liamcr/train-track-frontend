import { Paper } from "@material-ui/core";
import React, { useState } from "react";
import { Comment, Workout } from "../util/commonTypes";
import CommentInput from "./CommentInput";

type CommentSectionProps = {
  workout: Workout;
};

const CommentSection: React.FC<CommentSectionProps> = ({ workout }) => {
  const [commentList, setCommentList] = useState<Comment[]>(workout.comments);

  const addComment = (comment: Comment) => {
    setCommentList((prevCommentList) => [...prevCommentList, comment]);
  };

  return (
    <Paper
      square
      style={{
        backgroundColor: "rgb(60, 60, 60)",
        padding: 8,
      }}
    >
      <CommentInput workout={workout} addComment={addComment} />
    </Paper>
  );
};

export default CommentSection;
