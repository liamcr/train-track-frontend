import React from "react";
import { TIMELINE_URL } from "../util/consts";
import Timeline from "../components/Timeline";
import {
  Fab,
  makeStyles,
  createStyles,
  useMediaQuery,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import PageWrapper from "../components/PageWrapper";

const useStyles = makeStyles(() =>
  createStyles({
    fab: {
      position: "fixed",
      right: 16,
    },
  })
);

const Home: React.FC = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");

  const classes = useStyles();

  return (
    <PageWrapper navValue="home">
      <Timeline dataUrl={TIMELINE_URL} />
      <Fab
        color="primary"
        size="large"
        href="/new-workout"
        className={classes.fab}
        style={{ bottom: isMobile ? 72 : 16 }}
      >
        <AddIcon />
      </Fab>
    </PageWrapper>
  );
};

export default Home;
