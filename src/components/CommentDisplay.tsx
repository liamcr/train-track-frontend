import { Avatar, Divider, Typography } from "@material-ui/core";
import React from "react";
import { Comment } from "../util/commonTypes";

type CommentDisplayProps = {
  comment: Comment;
};

const CommentDisplay: React.FC<CommentDisplayProps> = ({ comment }) => {
  return (
    <div key={comment._id}>
      <div
        className="comment-content"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          marginTop: 4,
        }}
      >
        <Avatar />
        <div style={{ marginLeft: 16 }}>
          <Typography variant="subtitle2" color="textSecondary">
            liamc
          </Typography>
          <Typography>{comment.comment}</Typography>
        </div>
      </div>
      <Divider style={{ margin: "8px 0" }} />
    </div>
  );
};

export default CommentDisplay;
