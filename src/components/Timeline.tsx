import React from "react";
import { Workout } from "../util/commonTypes";
import LoadingIndicator from "./LoadingIndicator";
import "../styles/Timeline.css";

type TimelineProps = {
  data: [Workout] | null;
};

const Timeline: React.FC<TimelineProps> = ({ data }) => {
  return (
    <div className="timeline-container">
      {data === null ? <LoadingIndicator size="xlarge" /> : <div>Loaded!</div>}
    </div>
  );
};

export default Timeline;
