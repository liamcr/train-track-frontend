const apiHost =
  process.env.BACKEND_URL || "https://train-track-api-4wf42j4sua-ue.a.run.app";

export const REGISTER_URL = `${apiHost}/users/register`;
export const LOGIN_URL = `${apiHost}/users/login`;
export const USER_URL = (userId: string) => `${apiHost}/users/${userId}`;
export const TIMELINE_URL = `${apiHost}/timeline`;
export const USER_WORKOUTS_URL = (userId: string) =>
  `${apiHost}/workouts/user/${userId}`;
export const ADD_WORKOUT_URL = `${apiHost}/workouts/add`;

export const GET_EXERCISE_URL = (exerciseId: string) =>
  `${apiHost}/exercises/${exerciseId}`;
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

export const UPDATE_USER_URL = `${apiHost}/users/update`;

export const COMMENT_URL = (workoutId: string) =>
  `${apiHost}/workouts/comment/${workoutId}`;
