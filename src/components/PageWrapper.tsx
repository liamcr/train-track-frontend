import {
  BottomNavigation,
  BottomNavigationAction,
  ButtonBase,
  createStyles,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import UserIcon from "@material-ui/icons/Person";
import React, { useEffect } from "react";
import Logo from "../assets/train-track-init-logo.svg";
import Header from "./Header";
import { setAccessToken } from "../util/helperFns";

type PageWrapperProps = {
  navValue?: "home" | "search" | "profile";
  fixedHeader?: boolean;
  bottomNavHidden?: boolean;
};

const drawerWidth = 360;

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
    root: {
      display: "flex",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      width: `calc(100% - ${drawerWidth}px)`,
    },
    logoContainer: {
      height: 180,
      padding: 16,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    logo: {
      height: 64,
      marginRight: 16,
    },
  })
);

const PageWrapper: React.FC<PageWrapperProps> = ({
  children,
  navValue,
  fixedHeader,
  bottomNavHidden,
}) => {
  setAccessToken();

  const classes = useStyles();

  const isMobile = useMediaQuery("(max-width: 600px)");

  return (
    <>
      {isMobile ? (
        <>
          <Header fixed={!!fixedHeader} />
          {children}
          {!bottomNavHidden && (
            <>
              <div style={{ height: 64 }} />
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
            </>
          )}
        </>
      ) : (
        <div className={classes.root}>
          <Drawer
            className={classes.drawer}
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            anchor="left"
          >
            <ButtonBase href="/home" className={classes.logoContainer}>
              <img src={Logo} alt="Train Track Logo" className={classes.logo} />
              <Typography variant="h4">Train Track</Typography>
            </ButtonBase>
            <Divider />
            <List>
              {["Home", "Search", "Profile"].map((name, i) => (
                <ListItem
                  key={i}
                  button
                  onClick={() => {
                    window.location.href = `/${name.toLowerCase()}`;
                  }}
                >
                  <ListItemIcon>
                    {i === 0 ? (
                      <HomeIcon fontSize="large" />
                    ) : i === 1 ? (
                      <SearchIcon fontSize="large" />
                    ) : (
                      <UserIcon fontSize="large" />
                    )}
                  </ListItemIcon>
                  <Typography variant="body1" style={{ fontSize: 20 }}>
                    {name}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </Drawer>
          <div
            className={classes.content}
            style={{ marginTop: navValue !== "profile" ? 32 : 0 }}
          >
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default PageWrapper;
