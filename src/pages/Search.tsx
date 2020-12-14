import React from "react";
import { setAccessToken } from "../util/helperFns";
import Header from "../components/Header";
import {
  makeStyles,
  createStyles,
  BottomNavigation,
  BottomNavigationAction,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import UserIcon from "@material-ui/icons/Person";
import UserSearch from "../components/UserSearch";

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

const Search: React.FC = () => {
  setAccessToken();

  const classes = useStyles();

  return (
    <>
      <Header />
      <UserSearch />
      <BottomNavigation value="search" className={classes.tabBar}>
        <BottomNavigationAction
          label="Home"
          value="home"
          icon={<HomeIcon />}
          href="/home"
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
          href="/profile"
        />
      </BottomNavigation>
    </>
  );
};

export default Search;
