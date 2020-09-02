/**
 * Handles the updating and verification of the user's access token.
 * Redirects the user to the log-in page if there is no access token
 * available.
 */
export const setAccessToken = () => {
  const windowHash = window.location.hash.substr(1);

  if (windowHash) {
    localStorage.setItem("train-track-access-token", windowHash);
    return;
  }

  if (localStorage.getItem("train-track-access-token")) {
    return;
  }

  // If no access token in window hash OR localStorage, user must not be logged-in
  window.location.href = "/";
};

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
