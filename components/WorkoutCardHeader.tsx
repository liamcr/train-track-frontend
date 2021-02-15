import {
  Avatar,
  Chip,
  createStyles,
  makeStyles,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { USER_URL } from "../util/consts";
import { FullUser, Workout } from "../util/commonTypes";
import { formatDate } from "../util/helperFns";
import { useCookies } from "react-cookie";

const styles = require("../styles/WorkoutPage.module.css");

type WorkoutCardHeaderProps = {
  workoutData: Workout;
};

const useStyles = makeStyles(() =>
  createStyles({
    dateSubtitle: {
      marginRight: 8,
    },
  })
);

const WorkoutCardHeader: React.FC<WorkoutCardHeaderProps> = ({
  workoutData,
}) => {
  const classes = useStyles();

  const [userData, setUserData] = useState<FullUser | null>(null);

  const [cookies] = useCookies(["userToken"]);

  useEffect(() => {
    axios
      .get(USER_URL(workoutData.user), {
        headers: {
          Authorization: `Bearer ${cookies.userToken}`,
        },
      })
      .then((response) => {
        setUserData(response.data);
      });
  }, [workoutData.user]);

  return (
    <>
      <Typography variant="h2">{workoutData.name}</Typography>
      <div className={styles.workoutCardSubheader}>
        <Typography
          variant="subtitle1"
          color="textSecondary"
          className={classes.dateSubtitle}
        >
          {formatDate(workoutData.date)}
        </Typography>
        {userData !== null && (
          <Chip
            avatar={
              userData.displayImage !== "" ? (
                <Avatar src={userData.displayImage} />
              ) : (
                <Avatar>{userData.username[0]}</Avatar>
              )
            }
            clickable
            onClick={() => {
              if (typeof window !== "undefined")
                window.location.href = `/profile/${userData._id}`;
            }}
            color="primary"
            label={userData.username}
          />
        )}
      </div>
    </>
  );
};

export default WorkoutCardHeader;
