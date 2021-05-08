import { Paper } from "@material-ui/core";
import React, { useState } from "react";
import { Comment, Workout } from "../util/commonTypes";
import CommentInput from "./CommentInput";
import PreviousComments from "./PreviousComments";

type CommentSectionProps = {
  workout: Workout;
  comments: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
};

const CommentSection: React.FC<CommentSectionProps> = ({
  workout,
  comments,
  setComments,
}) => {
  const addComment = (comment: Comment) => {
    setComments((prevCommentList) => [...prevCommentList, comment]);
  };

  return (
    <Paper
      square
      style={{
        backgroundColor: "rgb(60, 60, 60)",
        padding: 16,
      }}
    >
      <PreviousComments commentList={comments} />
      <CommentInput workout={workout} addComment={addComment} />
    </Paper>
  );
};

export default CommentSection;
