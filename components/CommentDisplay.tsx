import { Avatar, Divider, Typography } from "@material-ui/core";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { USER_URL } from "../util/consts";
import { Comment, User } from "../util/commonTypes";
import { CacheContext } from "../util/TimelineUserCache";
import { useCookies } from "react-cookie";

type CommentDisplayProps = {
  comment: Comment;
};

const CommentDisplay: React.FC<CommentDisplayProps> = ({ comment }) => {
  const { state, dispatch } = useContext(CacheContext);

  const [userInfo, setUserInfo] = useState<User | null>(null);

  const [cookies] = useCookies(["userToken"]);

  useEffect(() => {
    if (state[comment.user] !== undefined && userInfo === null) {
      setUserInfo(state[comment.user]);
    } else if (state[comment.user] === undefined) {
      axios
        .get(USER_URL(comment.user), {
          headers: {
            Authorization: `Bearer ${cookies["userToken"]}`,
          },
        })
        .then((response) => {
          dispatch({
            type: "ADD_USER",
            payload: {
              userId: response.data._id,
              displayName: response.data.username,
              displayImage: response.data.displayImage,
            },
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [state, comment.user, dispatch, userInfo]);

  const onAvatarOrNameClick = () => {
    if (typeof window !== "undefined")
      window.location.href = `/profile/${comment.user}`;
  };

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
        <Avatar
          src={userInfo?.displayImage}
          onClick={onAvatarOrNameClick}
          style={{ cursor: "pointer" }}
        />
        <div style={{ marginLeft: 16 }}>
          <Typography
            variant="subtitle2"
            color="textSecondary"
            onClick={onAvatarOrNameClick}
            style={{ cursor: "pointer" }}
          >
            {userInfo === null ? "" : userInfo.displayName}
          </Typography>
          <Typography>{comment.comment}</Typography>
        </div>
      </div>
      <Divider style={{ margin: "8px 0" }} />
    </div>
  );
};

export default CommentDisplay;
