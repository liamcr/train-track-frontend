import React, { useContext, useState, useEffect } from "react";
import { Workout, User } from "../util/commonTypes";
import Card from "./Card";
import { CacheContext } from "../util/TimelineUserCache";
import axios from "axios";
import { USER_URL } from "../consts";
import Placeholder from "./Placeholder";
import "../styles/WorkoutCard.css";

type WorkoutCardProps = {
  workout: Workout;
};

const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout }) => {
  const { state, dispatch } = useContext(CacheContext);
  const [userInfo, setUserInfo] = useState<User | null>(null);

  useEffect(() => {
    if (state[workout.user] !== undefined && userInfo === null) {
      setUserInfo(state[workout.user]);
    } else if (state[workout.user] === undefined) {
      axios
        .get(USER_URL(workout.user), {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "train-track-access-token"
            )}`,
          },
        })
        .then((response) => {
          dispatch({
            type: "ADD_USER",
            payload: {
              userId: response.data._id,
              displayName: response.data.username,
            },
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [state, workout.user, dispatch, userInfo]);

  return (
    <Card
      style={{
        width: "calc(100% - 32px)",
        maxWidth: "500px",
        height: 128,
        margin: 12,
      }}
    >
      <div className="user-information-header">
        <Placeholder height={32} width={32} circle={true} />
        <div style={{ width: 12 }} />
        {userInfo === null ? (
          <Placeholder height={24} width={96} />
        ) : (
          userInfo.displayName
        )}
      </div>
    </Card>
  );
};

export default WorkoutCard;
