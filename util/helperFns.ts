import cookie from "cookie";
import { IncomingMessage } from "http";
import jwtDecode from "jwt-decode";
import { ExerciseSet, ParsedAccessToken } from "./commonTypes";

/**
 * Get access token from cookies.
 * @param req Request from NextPageContext
 */
export function getAccessToken(req?: IncomingMessage): string | undefined {
  const parsedCookies = cookie.parse(
    req ? req.headers.cookie || "" : document.cookie
  );

  return parsedCookies?.userToken;
}

export function getUserIdFromAccessToken(): string {
  const { userId } = jwtDecode(getAccessToken() || "") as ParsedAccessToken;

  return userId;
}

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const formatDate = (rawDate: string) => {
  let date = new Date(rawDate);

  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};

const singularUnits = {
  reps: "rep",
  seconds: "second",
  minutes: "minute",
};

export const formatSet = (setObj: ExerciseSet) => {
  return `${setObj.value} ${singularUnits[setObj.unit]}${
    setObj.value !== 1 ? "s" : ""
  }${
    setObj.weight.unit !== undefined && setObj.weight.value !== undefined
      ? ` · ${setObj.weight.value} ${setObj.weight.unit}`
      : ""
  }`;
};
