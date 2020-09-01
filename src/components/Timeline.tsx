import React from "react";
import { Workout } from "../util/commonTypes";
import LoadingIndicator from "./LoadingIndicator";
import NotFoundIcon from "../assets/icons/notFound.svg";
import "../styles/Timeline.css";
import WorkoutCard from "./WorkoutCard";
import { TimelineProvider } from "../util/TimelineUserCache";

type TimelineProps = {
  data: Workout[] | null;
};

const Timeline: React.FC<TimelineProps> = ({ data }) => {
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
        <TimelineProvider>
          {data.map((workout, index) => (
            <WorkoutCard key={index} workout={workout} />
          ))}
        </TimelineProvider>
      )}
    </div>
  );
};

export default Timeline;
