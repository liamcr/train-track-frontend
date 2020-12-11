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
            ? "https://scontent.fybz2-1.fna.fbcdn.net/v/t1.0-9/71033630_1574351756041270_2416587937782169600_o.jpg?_nc_cat=100&ccb=2&_nc_sid=09cbfe&_nc_ohc=EmM_JYxNc7gAX8zYEpH&_nc_ht=scontent.fybz2-1.fna&oh=096c4a6860805536bc94c3043d6d631e&oe=5FCD3B4E"
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
