import axios from "axios";
import React, { useEffect, useState } from "react";
import { USER_URL, USER_WORKOUTS_URL } from "../consts";
import { setAccessToken } from "../util/helperFns";
import ProfileImage from "../components/ProfileImage";
import { FullUser, Workout } from "../util/commonTypes";
import Timeline from "../components/Timeline";
import FollowerBar from "../components/FollowerBar";
import PageWrapper from "../components/PageWrapper";

const Profile: React.FC = () => {
  setAccessToken();

  const [userData, setUserData] = useState<FullUser | null>(null);
  const [userWorkouts, setUserWorkouts] = useState<Workout[] | null>(null);

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

        axios
          .get(USER_WORKOUTS_URL(user.data._id), {
            headers: {
              Authorization: `Bearer ${localStorage.getItem(
                "train-track-access-token"
              )}`,
            },
          })
          .then((response) => {
            setUserWorkouts(response.data);
          })
          .catch((err) => console.log("oops"));
      })
      .catch((err) => console.log("oops"));
  }, []);

  return (
    <PageWrapper navValue="profile" fixedHeader>
      <ProfileImage user={userData} />
      <FollowerBar
        followers={userData ? userData.followers : null}
        following={userData ? userData.following : null}
      />
      <Timeline data={userWorkouts} profile />
    </PageWrapper>
  );
};

export default Profile;
