import React, { useState } from "react";
import { Workout, User, UserCache } from "../util/commonTypes";
import LoadingIndicator from "./LoadingIndicator";
import NotFoundIcon from "../assets/icons/notFound.svg";
import "../styles/Timeline.css";
import WorkoutCard from "./WorkoutCard";
import { TimelineUserCacheContext } from "../util/TimelineUserCache";

type TimelineProps = {
  data: Workout[] | null;
};

const Timeline: React.FC<TimelineProps> = ({ data }) => {
  const [userCache, setUserCache] = useState<UserCache>({});

  const addUser = (userId: string, user: User) => {
    setUserCache((prevUserCache) => {
      let newUserCache = prevUserCache;

      newUserCache[userId] = user;

      return newUserCache;
    });
  };

  return (
    <div className="timeline-container">
      {data === null ? (
        <LoadingIndicator size="xlarge" />
      ) : data.length === 0 ? (
        <div className="not-found-container">
          <img
            src={NotFoundIcon}
            className="not-found-icon"
            alt="No workouts found"
          />
          No workouts found. Click the "+" button below to add your first!
        </div>
      ) : (
        <TimelineUserCacheContext.Provider
          value={{ userCache: userCache, addUser: addUser }}
        >
          {data.map((workout, index) => (
            <WorkoutCard key={index} workout={workout} />
          ))}
        </TimelineUserCacheContext.Provider>
      )}
    </div>
  );
};

export default Timeline;
