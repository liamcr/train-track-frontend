import axios from "axios";
import React, { useEffect, useState } from "react";
import { USER_URL, USER_WORKOUTS_URL } from "../consts";
import { setAccessToken } from "../util/helperFns";
import {
  makeStyles,
  createStyles,
  BottomNavigation,
  BottomNavigationAction,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import UserIcon from "@material-ui/icons/Person";
import Header from "../components/Header";
import ProfileImage from "../components/ProfileImage";
import { FullUser, Workout } from "../util/commonTypes";
import Timeline from "../components/Timeline";
import FollowerBar from "../components/FollowerBar";
import FollowButton from "../components/FollowButton";

const useStyles = makeStyles(() =>
  createStyles({
    tabBar: {
      position: "fixed",
      bottom: 0,
      width: "100vw",
      backgroundColor: "hsl(204, 100%, 50%)",
      "& .Mui-selected": {
        color: "white",
      },
    },
  })
);

const Profile: React.FC = () => {
  setAccessToken();

  const [userData, setUserData] = useState<FullUser | null>(null);
  const [userWorkouts, setUserWorkouts] = useState<Workout[] | null>(null);

  const classes = useStyles();

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
    <>
      <Header fixed />
      <ProfileImage
        src={
          userData
            ? "https://pbs.twimg.com/profile_images/1189566497603117056/IocOf6FS_400x400.jpg"
            : "#"
        }
        profileName={userData ? userData.username : ""}
      />
      {userData !== null && userData.isFollowing !== undefined && (
        <FollowButton
          initFollowState={userData.isFollowing}
          userId={userData._id}
        />
      )}
      <FollowerBar
        followers={userData ? userData.followers : null}
        following={userData ? userData.following : null}
      />
      <Timeline data={userWorkouts} />
      <BottomNavigation value="profile" className={classes.tabBar}>
        <BottomNavigationAction
          label="Home"
          value="home"
          href="/home"
          icon={<HomeIcon />}
        />
        <BottomNavigationAction
          label="Search"
          value="search"
          icon={<SearchIcon />}
          href="/search"
        />
        <BottomNavigationAction
          label="Profile"
          value="profile"
          icon={<UserIcon />}
        />
      </BottomNavigation>
    </>
  );
};

export default Profile;
