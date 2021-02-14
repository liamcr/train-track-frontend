import React, { useCallback, useEffect, useRef, useState } from "react";
import { Workout } from "../util/commonTypes";
import WorkoutCard from "./WorkoutCard";
import { TimelineProvider } from "../util/TimelineUserCache";
import { CircularProgress } from "@material-ui/core";
import axios from "axios";
import ToastAlert from "./ToastAlert";
import Image from "next/image";

const styles = require("../styles/Timeline.module.css");

type TimelineProps = {
  dataUrl: string;
  profile?: boolean;
};

const Timeline: React.FC<TimelineProps> = ({ dataUrl, profile }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [timeline, setTimeline] = useState<Workout[] | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [hasMore, setHasMore] = useState(true);

  const limit = 3;

  const observer = useRef<IntersectionObserver>();

  const bottomRef = useCallback(
    (node) => {
      if (isLoading || typeof window === "undefined") return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setOffset((prevOffset) => prevOffset + limit);
        }
      });
      if (node) observer.current.observe(node);
    },
    [observer, isLoading, hasMore]
  );

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    axios
      .get(`${dataUrl}?limit=${limit}&offset=${offset}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            "train-track-access-token"
          )}`,
        },
      })
      .then((response) => {
        if (isMounted) {
          setTimeline((prevTimeline) =>
            prevTimeline === null
              ? response.data
              : [...prevTimeline, ...response.data]
          );

          if (response.data.length < limit) {
            setHasMore(false);
          }
        }
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
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [offset, dataUrl, setHasMore]);

  const handleClose = () => {
    setErrorMessage("");
  };

  return (
    <div className={styles.timelineContainer}>
      {timeline === null ? (
        <CircularProgress color="primary" />
      ) : timeline.length === 0 ? (
        <div className={styles.notFoundContainer}>
          <Image
            src="/notFound.svg"
            height={128}
            width={128}
            alt="No workouts found"
          />
          {`No workouts found. ${
            !profile ? 'Click the "+" button below to add your first!' : ""
          }`}
        </div>
      ) : (
        <>
          <TimelineProvider>
            {timeline.map((workout, index) => (
              <WorkoutCard key={index} workout={workout} />
            ))}
          </TimelineProvider>
          {hasMore ? (
            <CircularProgress ref={bottomRef} />
          ) : (
            <div className={styles.noMorePosts}>No More Posts</div>
          )}
        </>
      )}
      <ToastAlert message={errorMessage} type="error" onClose={handleClose} />
    </div>
  );
};

export default Timeline;
