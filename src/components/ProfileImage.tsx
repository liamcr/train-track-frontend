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
      <img className="profile-image" src={src} />
      <div className="profile-image-overlay">
        <Typography variant="h3">{profileName}</Typography>
      </div>
    </div>
  );
};

export default ProfileImage;
