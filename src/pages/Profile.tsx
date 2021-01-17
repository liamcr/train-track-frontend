import axios from "axios";
import React, { useEffect, useState } from "react";
import { USER_URL, USER_WORKOUTS_URL } from "../consts";
import ProfileImage from "../components/ProfileImage";
import { FullUser } from "../util/commonTypes";
import Timeline from "../components/Timeline";
import FollowerBar from "../components/FollowerBar";
import PageWrapper from "../components/PageWrapper";
import { FollowersProvider } from "../util/FollowerContextProvider";

const Profile: React.FC = () => {
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
      .catch((err) => console.log("oops"));
  }, []);

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
    </PageWrapper>
  );
};

export default Profile;
