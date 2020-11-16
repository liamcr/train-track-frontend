import { ButtonBase, Typography } from "@material-ui/core";
import React from "react";
import "../styles/FollowerBar.css";

type FollowerBarProps = {
  followers: string[] | null;
  following: string[] | null;
};

const FollowerBar: React.FC<FollowerBarProps> = ({ followers, following }) => {
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
