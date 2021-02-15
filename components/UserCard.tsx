import React from "react";
import {
  Avatar,
  Card,
  CardActionArea,
  CardHeader,
  createStyles,
  makeStyles,
} from "@material-ui/core";
import { FullUser } from "../util/commonTypes";

type UserCardProps = {
  userInfo: FullUser;
};

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      marginTop: 8,
    },
  })
);

const UserCard: React.FC<UserCardProps> = ({ userInfo }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea href={`/profile/${userInfo._id}`}>
        <CardHeader
          avatar={<Avatar src={userInfo.displayImage} />}
          title={userInfo.username}
          subheader={`${userInfo.followers.length} followers | ${userInfo.following.length} following`}
        />
      </CardActionArea>
    </Card>
  );
};

export default UserCard;
