import { Typography } from "@material-ui/core";
import { Person } from "@material-ui/icons";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FullUser } from "../util/commonTypes";
import { getUserIdFromAccessToken } from "../util/helperFns";
import EditProfileButton from "./EditProfileButton";
import FollowButton from "./FollowButton";

const styles = require("../styles/ProfileImage.module.css");

type ProfileImageProps = {
  user: FullUser | null;
};

const ProfileImage: React.FC<ProfileImageProps> = ({ user }) => {
  const [currentUserId, setCurrentUserId] = useState("");

  // Wrap currentUserId in useEffect so that `document` is accessible
  useEffect(() => {
    setCurrentUserId(getUserIdFromAccessToken());
  }, []);

  return (
    <div className={styles.profileImageContainer}>
      {user && user.displayImage !== "" ? (
        <Image
          layout="fill"
          objectFit="cover"
          src={user.displayImage}
          alt={`${user.username} DP`}
        />
      ) : (
        <Person
          style={{
            position: "absolute",
            top: 0,
            left: 0,
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
