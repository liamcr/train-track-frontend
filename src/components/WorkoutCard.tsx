import React, { useContext, useState, useEffect } from "react";
import { Workout, User } from "../util/commonTypes";
import Card from "./Card";
import { TimelineUserCacheContext } from "../util/TimelineUserCache";
import axios from "axios";
import { USER_URL } from "../consts";

type WorkoutCardProps = {
  workout: Workout;
};

const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout }) => {
  const { userCache, addUser } = useContext(TimelineUserCacheContext);
  const [userInfo, setUserInfo] = useState<User | null>(null);

  useEffect(() => {
    if (userCache[workout.user] !== undefined && userInfo === null) {
      setUserInfo(userCache[workout.user]);
    } else if (userInfo === null) {
      axios
        .get(USER_URL(workout.user), {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "train-track-access-token"
            )}`,
          },
        })
        .then((response) => {
          addUser(response.data._id, { displayName: response.data.username });
          setUserInfo({ displayName: response.data.username });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userCache, workout.user]);

  return (
    <Card style={{ width: "100%", maxWidth: "500px" }}>
      <div className="user-information-header"></div>
    </Card>
  );
};

export default WorkoutCard;
