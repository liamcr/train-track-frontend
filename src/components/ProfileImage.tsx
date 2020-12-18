import { Typography } from "@material-ui/core";
import React from "react";
import "../styles/ProfileImage.css";
import { FullUser } from "../util/commonTypes";
import EditProfileButton from "./EditProfileButton";
import FollowButton from "./FollowButton";

type ProfileImageProps = {
  user: FullUser | null;
};

const ProfileImage: React.FC<ProfileImageProps> = ({ user }) => {
  return (
    <div className="profile-image-container">
      <img className="profile-image" src={"#"} alt={`${user?.username} DP`} />
      <div className="profile-image-overlay">
        <div className="profile-overlay-content">
          <Typography variant="h4">{user?.username}</Typography>

          {user !== null && user.isFollowing !== undefined && (
            <FollowButton
              initFollowState={user.isFollowing}
              userId={user._id}
            />
          )}
          {user !== null && user.isFollowing === undefined && (
            <EditProfileButton user={user} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileImage;
