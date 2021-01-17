import React, { useEffect, useState } from "react";
import { Workout } from "../util/commonTypes";
import NotFoundIcon from "../assets/icons/notFound.svg";
import "../styles/Timeline.css";
import WorkoutCard from "./WorkoutCard";
import { TimelineProvider } from "../util/TimelineUserCache";
import { CircularProgress } from "@material-ui/core";
import axios from "axios";

type TimelineProps = {
  dataUrl: string;
  profile?: boolean;
};

const Timeline: React.FC<TimelineProps> = ({ dataUrl, profile }) => {
  const [offset, setOffset] = useState(0);
  const [timeline, setTimeline] = useState<Workout[] | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const limit = 10;

  useEffect(() => {
    axios
      .get(`${dataUrl}?limit=${limit}&offset=${offset}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            "train-track-access-token"
          )}`,
        },
      })
      .then((response) => {
        setTimeline(response.data);
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
  }, [offset]);

  return (
    <div className="timeline-container">
      {timeline === null ? (
        <CircularProgress color="primary" />
      ) : timeline.length === 0 ? (
        <div className="not-found-container">
          <img
            src={NotFoundIcon}
            className="not-found-icon"
            alt="No workouts found"
          />
          {`No workouts found. ${
            !profile ? 'Click the "+" button below to add your first!' : ""
          }`}
        </div>
      ) : (
        <TimelineProvider>
          {timeline.map((workout, index) => (
            <WorkoutCard key={index} workout={workout} />
          ))}
        </TimelineProvider>
      )}
    </div>
  );
};

export default Timeline;
