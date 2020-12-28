import React, { useEffect, useState } from "react";
import { setAccessToken } from "../util/helperFns";
import axios from "axios";
import { TIMELINE_URL } from "../consts";
import { Workout } from "../util/commonTypes";
import Timeline from "../components/Timeline";
import { Fab, makeStyles, createStyles } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import PageWrapper from "../components/PageWrapper";

const useStyles = makeStyles(() =>
  createStyles({
    fab: {
      position: "fixed",
      right: 16,
      bottom: 72,
    },
  })
);

const Home: React.FC = () => {
  setAccessToken();

  const [limit, setLimit] = useState(10);
  const [timeline, setTimeline] = useState<Workout[] | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const classes = useStyles();

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
    <PageWrapper navValue="home">
      <Timeline data={timeline} />
      <Fab
        color="primary"
        size="large"
        href="/new-workout"
        className={classes.fab}
      >
        <AddIcon />
      </Fab>
    </PageWrapper>
  );
};

export default Home;
