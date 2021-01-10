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
import { USER_URL } from "../consts";
import NotFoundIcon from "../assets/icons/notFound.svg";
import "../styles/FollowerBar.css";
import { FollowersContext } from "../util/FollowerContextProvider";

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

  const [followerOpen, setFollowerOpen] = useState(false);
  const [followingOpen, setFollowingOpen] = useState(false);

  useEffect(() => {
    if (followers) {
      dispatch({ type: "SET", initValue: followers.length });
      for (let followerId of followers) {
        axios
          .get(USER_URL(followerId), {
            headers: {
              Authorization: `Bearer ${localStorage.getItem(
                "train-track-access-token"
              )}`,
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
            console.error(err);
          });
      }
    }
  }, [followers]);

  useEffect(() => {
    if (following) {
      for (let followingId of following) {
        axios
          .get(USER_URL(followingId), {
            headers: {
              Authorization: `Bearer ${localStorage.getItem(
                "train-track-access-token"
              )}`,
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
            console.error(err);
          });
      }
    }
  }, [following]);

  return (
    <div className="follower-bar-container">
      {followers && following ? (
        <>
          <ButtonBase
            className="user-follow-count"
            onClick={() => {
              setFollowerOpen(true);
            }}
          >
            <Typography variant="h6">{state.updatedFollowers}</Typography>
            <Typography variant="subtitle2">Followers</Typography>
          </ButtonBase>
          <ButtonBase
            className="user-follow-count"
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
                      window.location.href = `/profile?id=${followerId}`;
                    }}
                    key={followerId}
                  >
                    <ListItemIcon>
                      {followerDisplayNames[followerId] &&
                      followerDisplayNames[followerId].displayImage !== "" ? (
                        <Avatar
                          src={followerDisplayNames[followerId].displayImage}
                        />
                      ) : (
                        <Avatar>
                          {followerDisplayNames[followerId]
                            ? followerDisplayNames[followerId].username[0]
                            : ""}
                        </Avatar>
                      )}
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
              <div className="no-users-container">
                <img
                  src={NotFoundIcon}
                  className="not-found-icon"
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
                      window.location.href = `/profile?id=${followingId}`;
                    }}
                    key={followingId}
                  >
                    <ListItemIcon>
                      {followingDisplayNames[followingId] &&
                      followingDisplayNames[followingId].displayImage !== "" ? (
                        <Avatar
                          src={followingDisplayNames[followingId].displayImage}
                        />
                      ) : (
                        <Avatar>
                          {followingDisplayNames[followingId]
                            ? followingDisplayNames[followingId].username[0]
                            : ""}
                        </Avatar>
                      )}
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
              <div className="no-users-container">
                <img
                  src={NotFoundIcon}
                  className="not-found-icon"
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
    </div>
  );
};

export default FollowerBar;
