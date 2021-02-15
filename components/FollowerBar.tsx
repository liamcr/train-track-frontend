import {
  Avatar,
  ButtonBase,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { USER_URL } from "../util/consts";
import { FollowersContext } from "../util/FollowerContextProvider";
import ToastAlert from "./ToastAlert";
import Image from "next/image";
import { useCookies } from "react-cookie";

const styles = require("../styles/FollowerBar.module.css");

type FollowerBarProps = {
  followers: string[] | null;
  following: string[] | null;
};

const FollowerBar: React.FC<FollowerBarProps> = ({ followers, following }) => {
  const [followerDisplayNames, setFollowerDisplayNames] = useState<{
    [key: string]: {
      username: string;
      displayImage: string;
    };
  }>({});
  const [followingDisplayNames, setFollowingDisplayNames] = useState<{
    [key: string]: {
      username: string;
      displayImage: string;
    };
  }>({});

  const { state, dispatch } = useContext(FollowersContext);

  const [errorMessage, setErrorMessage] = useState("");
  const [followerOpen, setFollowerOpen] = useState(false);
  const [followingOpen, setFollowingOpen] = useState(false);

  const [cookies] = useCookies(["userToken"]);

  useEffect(() => {
    if (followers) {
      dispatch({ type: "SET", initValue: followers.length });
      for (let followerId of followers) {
        axios
          .get(USER_URL(followerId), {
            headers: {
              Authorization: `Bearer ${cookies.userToken}`,
            },
          })
          .then((response) => {
            setFollowerDisplayNames((prevState) => {
              let updatedState = { ...prevState };

              updatedState[response.data._id] = {
                username: response.data.username,
                displayImage: response.data.displayImage,
              };

              return updatedState;
            });
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
      }
    }
  }, [followers, dispatch]);

  useEffect(() => {
    if (following) {
      for (let followingId of following) {
        axios
          .get(USER_URL(followingId), {
            headers: {
              Authorization: `Bearer ${cookies.userToken}`,
            },
          })
          .then((response) => {
            setFollowingDisplayNames((prevState) => {
              let updatedState = { ...prevState };

              updatedState[response.data._id] = {
                username: response.data.username,
                displayImage: response.data.displayImage,
              };

              return updatedState;
            });
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
      }
    }
  }, [following]);

  const handleClose = () => {
    setErrorMessage("");
  };

  return (
    <div className={styles.followerBarContainer}>
      {followers && following ? (
        <>
          <ButtonBase
            className={styles.userFollowCount}
            onClick={() => {
              setFollowerOpen(true);
            }}
          >
            <Typography variant="h6">{state.updatedFollowers}</Typography>
            <Typography variant="subtitle2">Followers</Typography>
          </ButtonBase>
          <ButtonBase
            className={styles.userFollowCount}
            onClick={() => {
              setFollowingOpen(true);
            }}
          >
            <Typography variant="h6">{following.length}</Typography>
            <Typography variant="subtitle2">Following</Typography>
          </ButtonBase>
          <Dialog
            onClose={() => {
              setFollowerOpen(false);
            }}
            open={followerOpen}
            fullWidth
          >
            <DialogTitle>Followers</DialogTitle>
            {followers.length > 0 ? (
              <List>
                {followers.map((followerId) => (
                  <ListItem
                    button
                    onClick={() => {
                      if (typeof window !== "undefined")
                        window.location.href = `/profile/${followerId}`;
                    }}
                    key={followerId}
                  >
                    <ListItemIcon>
                      {
                        <Avatar
                          src={followerDisplayNames[followerId]?.displayImage}
                        />
                      }
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        followerDisplayNames[followerId]
                          ? followerDisplayNames[followerId].username
                          : ""
                      }
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <div className={styles.noUsersContainer}>
                <Image
                  src="/notFound.svg"
                  width={96}
                  height={96}
                  alt="No workouts found"
                />
                No users found.
              </div>
            )}
          </Dialog>
          <Dialog
            onClose={() => {
              setFollowingOpen(false);
            }}
            open={followingOpen}
            fullWidth
          >
            <DialogTitle>Following</DialogTitle>
            {following.length > 0 ? (
              <List>
                {following.map((followingId) => (
                  <ListItem
                    button
                    onClick={() => {
                      if (typeof window !== "undefined")
                        window.location.href = `/profile/${followingId}`;
                    }}
                    key={followingId}
                  >
                    <ListItemIcon>
                      {
                        <Avatar
                          src={followingDisplayNames[followingId]?.displayImage}
                        />
                      }
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        followingDisplayNames[followingId]
                          ? followingDisplayNames[followingId].username
                          : ""
                      }
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <div className={styles.noUsersContainer}>
                <Image
                  src="/notFound.svg"
                  width={96}
                  height={96}
                  alt="No workouts found"
                />
                No users found.
              </div>
            )}
          </Dialog>
        </>
      ) : (
        <div />
      )}
      <ToastAlert message={errorMessage} type="error" onClose={handleClose} />
    </div>
  );
};

export default FollowerBar;
