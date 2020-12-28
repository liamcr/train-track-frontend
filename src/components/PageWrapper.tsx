import {
  BottomNavigation,
  BottomNavigationAction,
  createStyles,
  makeStyles,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import UserIcon from "@material-ui/icons/Person";
import React from "react";
import Header from "./Header";

type PageWrapperProps = {
  navValue?: "home" | "search" | "profile";
  fixedHeader?: boolean;
  bottomNavHidden?: boolean;
};

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

const PageWrapper: React.FC<PageWrapperProps> = ({
  children,
  navValue,
  fixedHeader,
  bottomNavHidden,
}) => {
  const classes = useStyles();

  return (
    <>
      <Header fixed={!!fixedHeader} />
      {children}
      {!bottomNavHidden && (
        <BottomNavigation value={navValue} className={classes.tabBar}>
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
            href="/search"
          />
          <BottomNavigationAction
            label="Profile"
            value="profile"
            icon={<UserIcon />}
            href="/profile"
          />
        </BottomNavigation>
      )}
    </>
  );
};

export default PageWrapper;
