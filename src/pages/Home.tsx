import React, { useEffect, useState } from "react";
import { setAccessToken } from "../util/helperFns";
import axios from "axios";
import { TIMELINE_URL } from "../consts";
import Header from "../components/Header";
import TabBar from "../components/TabBar";
import "../styles/Home.css";
import FloatingActionButton from "../components/FloatingActionButton";
import { Workout } from "../util/commonTypes";
import Timeline from "../components/Timeline";

const Home: React.FC = () => {
  setAccessToken();

  const [limit, setLimit] = useState(10);
  const [timeline, setTimeline] = useState<Workout[] | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onAddWorkout = () => {
    console.log("Adding workout...");
  };

  useEffect(() => {
    axios
      .get(TIMELINE_URL(limit), {
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
  }, [limit]);

  return (
    <div className="home-container">
      <Header />
      <Timeline data={timeline} />
      <FloatingActionButton onClick={onAddWorkout} />
      <TabBar index={0} />
    </div>
  );
};

export default Home;
