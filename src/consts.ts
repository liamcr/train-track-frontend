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

export const UPLOAD_URL = `${apiHost}/upload`;

export const WORKOUT_URL = (workoutId: string) =>
  `${apiHost}/workouts/${workoutId}`;

export const SEARCH_URL = (searchQuery: string) =>
  `${apiHost}/search?search=${searchQuery}`;

export const FOLLOW_URL = (userId: string) =>
  `${apiHost}/users/follow/${userId}`;
export const UNFOLLOW_URL = (userId: string) =>
  `${apiHost}/users/unfollow/${userId}`;

export const LIKE_URL = (workoutId: string) =>
  `${apiHost}/workouts/like/${workoutId}`;

export const UNLIKE_URL = (workoutId: string) =>
  `${apiHost}/workouts/unlike/${workoutId}`;
