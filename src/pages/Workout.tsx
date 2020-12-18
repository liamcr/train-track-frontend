import React, { useEffect } from "react";
import { setAccessToken } from "../util/helperFns";

const Workout: React.FC = () => {
  setAccessToken();

  useEffect(() => {
    const idSearchParam = new URL(window.location.href).searchParams.get("id");

    console.log(idSearchParam);

    if (idSearchParam === null) {
      window.location.href = "/home";
    }
  }, []);

  return <div>Workout page :)</div>;
};

export default Workout;
