const apiHost = "http://localhost:5000";

export const REGISTER_URL = `${apiHost}/users/register`;
export const LOGIN_URL = `${apiHost}/users/login`;
export const USER_URL = (userId: string) => `${apiHost}/users/${userId}`;
export const TIMELINE_URL = (limit = 10, offset = 0) =>
  `${apiHost}/timeline?limit=${limit}&offset=${offset}`;
export const USER_WORKOUTS_URL = (userId: string) =>
  `${apiHost}/workouts/user/${userId}`;
export const ADD_WORKOUT_URL = `${apiHost}/workouts/add`;
export const ADD_EXERCISES_URL = `${apiHost}/exercises/addBulk`;
