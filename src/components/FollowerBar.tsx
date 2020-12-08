import { ButtonBase, Typography } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { USER_URL } from "../consts";
import "../styles/FollowerBar.css";

type FollowerBarProps = {
  followers: string[] | null;
  following: string[] | null;
};

const FollowerBar: React.FC<FollowerBarProps> = ({ followers, following }) => {
  const [followerDisplayNames, setFollowerDisplayNames] = useState<{
    [key: string]: string;
  }>({});
  const [followingDisplayNames, setFollowingDisplayNames] = useState<{
    [key: string]: string;
  }>({});

  useEffect(() => {
    if (followers) {
      for (let followerId of followers) {
        axios
          .get(USER_URL(followerId), {
            headers: {
              Authorization: `Bearer ${localStorage.getItem(
                "train-track-access-token"
              )}`,
            },
          })
          .then((response) => {
            setFollowerDisplayNames((prevState) => {
              let updatedState = { ...prevState };

              updatedState[response.data._id] = response.data.username;

              return updatedState;
            });
          })
          .catch((err) => {
            console.error(err);
          });
      }
    }
  }, [followers]);

  useEffect(() => {
    if (following) {
      for (let followingId of following) {
        axios
          .get(USER_URL(followingId), {
            headers: {
              Authorization: `Bearer ${localStorage.getItem(
                "train-track-access-token"
              )}`,
            },
          })
          .then((response) => {
            setFollowingDisplayNames((prevState) => {
              let updatedState = { ...prevState };

              updatedState[response.data._id] = response.data.username;

              return updatedState;
            });
          })
          .catch((err) => {
            console.error(err);
          });
      }
    }
  }, [following]);

  return (
    <div className="follower-bar-container">
      {followers && following ? (
        <>
          <ButtonBase className="user-follow-count">
            <Typography variant="h6">{followers.length}</Typography>
            <Typography variant="subtitle2">Followers</Typography>
          </ButtonBase>
          <ButtonBase className="user-follow-count">
            <Typography variant="h6">{following.length}</Typography>
            <Typography variant="subtitle2">Following</Typography>
          </ButtonBase>
        </>
      ) : (
        <div />
      )}
    </div>
  );
};

export default FollowerBar;
