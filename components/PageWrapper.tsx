import {
  BottomNavigation,
  BottomNavigationAction,
  ButtonBase,
  createStyles,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  makeStyles,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import UserIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import { getAccessToken } from "../util/helperFns";
import Image from "next/image";
import SEO from "./SEO";
import jwt_decode from "jwt-decode";
import { ParsedAccessToken } from "../util/commonTypes";
import { useCookies } from "react-cookie";

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
    drawerItemTitle: {
      fontSize: 20,
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
    logoText: {
      marginLeft: 16,
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

  const [userId, setUserId] = useState("");

  const [, , removeCookie] = useCookies(["userToken"]);

  const isMobile = useMediaQuery("(max-width: 600px)");

  useEffect(() => {
    const accessToken = getAccessToken();

    if (!accessToken) {
      window.location.href = "/";

      return;
    }

    try {
      setUserId(jwt_decode<ParsedAccessToken>(accessToken).userId);
    } catch (error) {
      // Access token is invalid and/or doesn't match it's signature
      window.location.href = "/";

      return;
    }
  }, []);

  const handleLogOut = () => {
    removeCookie("userToken");

    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
  };

  return (
    <>
      <SEO title="Train Track" />
      {isMobile ? (
        <>
          <Header fixed={!!fixedHeader}>
            <Tooltip title="Log Out">
              <IconButton onClick={handleLogOut}>
                <ExitToAppIcon fontSize="large" />
              </IconButton>
            </Tooltip>
          </Header>
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
                  href={`/profile/${userId}`}
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
              <Image
                src="/train-track-init-logo.svg"
                alt="Train Track Logo"
                height={64}
                width={68}
              />
              <Typography variant="h4" className={classes.logoText}>
                Train Track
              </Typography>
            </ButtonBase>
            <Divider />
            <List style={{ flex: 1 }}>
              {["Home", "Search", "Profile"].map((name, i) => (
                <ListItem
                  key={i}
                  button
                  onClick={() => {
                    if (typeof window !== "undefined")
                      window.location.href = `/${name.toLowerCase()}/${
                        name === "Profile" ? userId : ""
                      }`;
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
                  <Typography
                    variant="body1"
                    className={classes.drawerItemTitle}
                  >
                    {name}
                  </Typography>
                </ListItem>
              ))}
              <ListItem
                key={3}
                button
                style={{ position: "absolute", bottom: 8 }}
                onClick={handleLogOut}
              >
                <ListItemIcon>
                  <ExitToAppIcon fontSize="large" />
                </ListItemIcon>
                <Typography variant="body1" className={classes.drawerItemTitle}>
                  Log Out
                </Typography>
              </ListItem>
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
