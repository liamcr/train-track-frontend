import { Avatar, IconButton, TextField } from "@material-ui/core";
import { Send } from "@material-ui/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { COMMENT_URL, USER_URL } from "../consts";
import { Comment, Workout } from "../util/commonTypes";

type CommentInputProps = {
  workout: Workout;
  addComment: (arg0: Comment) => void;
};

const CommentInput: React.FC<CommentInputProps> = ({ workout, addComment }) => {
  const [currentUserDisplayPicture, setCurrentUserDisplayPicture] = useState(
    ""
  );
  const [isLoading, setIsLoading] = useState(false);
  const [comment, setComment] = useState("");

  useEffect(() => {
    axios
      .get(USER_URL(""), {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            "train-track-access-token"
          )}`,
        },
      })
      .then((res) => {
        setCurrentUserDisplayPicture(res.data.displayImage);
      });
  }, []);

  const handleOnCommentChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setComment(event.target.value);
  };

  const onSend = () => {
    setIsLoading(true);

    axios
      .post(
        COMMENT_URL(workout._id),
        { comment: comment },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "train-track-access-token"
            )}`,
          },
        }
      )
      .then((res) => {
        setComment("");
        addComment(res.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Avatar src={currentUserDisplayPicture} style={{ marginRight: 16 }} />
      <TextField
        label="Comment"
        fullWidth
        value={comment}
        onChange={handleOnCommentChange}
        color="primary"
        inputProps={{ maxLength: 120 }}
      />
      <IconButton
        color="primary"
        disabled={isLoading || comment.length < 1}
        onClick={onSend}
      >
        <Send />
      </IconButton>
    </div>
  );
};

export default CommentInput;
