import React, { useEffect, useState } from "react";
import { setAccessToken } from "../util/helperFns";
import axios from "axios";
import { TIMELINE_URL } from "../consts";

const Timeline: React.FC = () => {
  setAccessToken();

  const [limit, setLimit] = useState(10);
  const [timeline, setTimeline] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
          setErrorMessage(err.message);
        } else {
          setErrorMessage("Something went wrong. Try again later.");
        }
      });
  }, [limit]);

  return <div>Hello!</div>;
};

export default Timeline;
