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
