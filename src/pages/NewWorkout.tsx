import React from "react";
import { setAccessToken } from "../util/helperFns";
import { Card, CardHeader } from "@material-ui/core";
import Header from "../components/Header";

const NewWorkout: React.FC = () => {
  setAccessToken();

  return (
    <div className="new-workout-container">
      <Header />
      <Card>
        <CardHeader title="New Workout" />
      </Card>
    </div>
  );
};

export default NewWorkout;
