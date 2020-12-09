import { Typography } from "@material-ui/core";
import React from "react";
import "../styles/ProfileImage.css";

type ProfileImageProps = {
  src: string;
  profileName: string;
};

const ProfileImage: React.FC<ProfileImageProps> = ({ src, profileName }) => {
  return (
    <div className="profile-image-container">
      <img className="profile-image" src={src} alt={`${profileName} DP`} />
      <div className="profile-image-overlay">
        <Typography variant="h4">{profileName}</Typography>
      </div>
    </div>
  );
};

export default ProfileImage;
