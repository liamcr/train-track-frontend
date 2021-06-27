import { Typography } from "@material-ui/core";
import { Person } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { FullUser } from "../util/commonTypes";
import { getUserIdFromAccessToken } from "../util/helperFns";
import EditProfileButton from "./EditProfileButton";
import FollowButton from "./FollowButton";

const styles = require("../styles/ProfileImage.module.css");

type ProfileImageProps = {
  user: FullUser | null;
};

const ProfileImage: React.FC<ProfileImageProps> = ({ user }) => {
  const [cookies] = useCookies(["userToken"]);
  const [currentUserId, setCurrentUserId] = useState("");

  useEffect(() => {
    if (cookies.userToken)
      setCurrentUserId(getUserIdFromAccessToken(cookies.userToken));
  }, [cookies]);

  return (
    <div className={styles.profileImageContainer}>
      {user && user.displayImage !== "" ? (
        <img
          className={styles.profileImage}
          src={user.displayImage}
          alt={`${user.username} DP`}
        />
      ) : (
        <Person
          style={{
            width: "100%",
            height: "100%",
          }}
          color="primary"
        />
      )}
      <div className={styles.profileImageOverlay}>
        <div className={styles.profileOverlayContent}>
          <Typography variant="h4">{user?.username}</Typography>

          {user !== null && currentUserId !== user._id && (
            <FollowButton
              initFollowState={user.isFollowing}
              userId={user._id}
            />
          )}
          {user !== null && currentUserId === user._id && (
            <EditProfileButton user={user} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileImage;
