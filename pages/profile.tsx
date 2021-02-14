import axios from "axios";
import React, { useEffect, useState } from "react";
import { USER_URL, USER_WORKOUTS_URL } from "../util/consts";
import ProfileImage from "../components/ProfileImage";
import { FullUser } from "../util/commonTypes";
import Timeline from "../components/Timeline";
import FollowerBar from "../components/FollowerBar";
import PageWrapper from "../components/PageWrapper";
import { FollowersProvider } from "../util/FollowerContextProvider";
import ToastAlert from "../components/ToastAlert";

const Profile: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [userData, setUserData] = useState<FullUser | null>(null);

  useEffect(() => {
    const idSearchParam = new URL(window.location.href).searchParams.get("id");

    let endpointToCall = USER_URL(idSearchParam === null ? "" : idSearchParam);

    axios
      .get(endpointToCall, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            "train-track-access-token"
          )}`,
        },
      })
      .then((user) => {
        setUserData(user.data);
      })
      .catch((err) => {
        if (
          err.response &&
          (err.response.status === 401 || err.response.status === 403)
        ) {
          window.location.href = "/";
        } else if (err.response && err.response.status === 404) {
          setErrorMessage(err.response.data);
        } else {
          setErrorMessage("Something went wrong. Try again later.");
        }
      });
  }, []);

  const handleClose = () => {
    setErrorMessage("");
  };

  return (
    <PageWrapper navValue="profile" fixedHeader>
      <FollowersProvider>
        <ProfileImage user={userData} />
        <FollowerBar
          followers={userData ? userData.followers : null}
          following={userData ? userData.following : null}
        />
      </FollowersProvider>
      {userData && (
        <Timeline dataUrl={USER_WORKOUTS_URL(userData._id)} profile />
      )}
      <ToastAlert message={errorMessage} type="error" onClose={handleClose} />
    </PageWrapper>
  );
};

export default Profile;
