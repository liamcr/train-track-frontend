import { Typography } from "@material-ui/core";
import { Person } from "@material-ui/icons";
import Image from "next/image";
import React from "react";
import { FullUser } from "../util/commonTypes";
import EditProfileButton from "./EditProfileButton";
import FollowButton from "./FollowButton";

const styles = require("../styles/ProfileImage.module.css");

type ProfileImageProps = {
  user: FullUser | null;
};

const ProfileImage: React.FC<ProfileImageProps> = ({ user }) => {
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
        <Person style={{ width: "100%", height: "100%" }} color="primary" />
      )}
      <div className={styles.profileImageOverlay}>
        <div className={styles.profileOverlayContent}>
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
