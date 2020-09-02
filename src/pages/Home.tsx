import React, { useEffect, useState } from "react";
import { setAccessToken } from "../util/helperFns";
import axios from "axios";
import { TIMELINE_URL } from "../consts";
import Header from "../components/Header";
import "../styles/Home.css";
import { Workout } from "../util/commonTypes";
import Timeline from "../components/Timeline";
import {
  Fab,
  makeStyles,
  createStyles,
  BottomNavigation,
  BottomNavigationAction,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import UserIcon from "@material-ui/icons/Person";

const useStyles = makeStyles(() =>
  createStyles({
    fab: {
      position: "fixed",
      right: 16,
      bottom: 72,
    },
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

const Home: React.FC = () => {
  setAccessToken();

  const [limit, setLimit] = useState(10);
  const [timeline, setTimeline] = useState<Workout[] | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const classes = useStyles();

  const onAddWorkout = () => {
    console.log("Adding workout...");
  };

  useEffect(() => {
    axios
      .get(TIMELINE_URL(limit), {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            "train-track-access-token"
          )}`,
        },
      })
      .then((response) => {
        setTimeline(response.data);
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
  }, [limit]);

  return (
    <div className="home-container">
      <Header />
      <Timeline data={timeline} />
      <Fab
        color="primary"
        size="large"
        onClick={onAddWorkout}
        className={classes.fab}
      >
        <AddIcon />
      </Fab>
      <BottomNavigation value="home" className={classes.tabBar}>
        <BottomNavigationAction label="Home" value="home" icon={<HomeIcon />} />
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
    </div>
  );
};

export default Home;
