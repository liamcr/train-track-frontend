const apiHost = "http://10.0.0.108:5000";

export const REGISTER_URL = `${apiHost}/users/register`;
export const LOGIN_URL = `${apiHost}/users/login`;
export const TIMELINE_URL = (limit = 10, offset = 0) =>
  `${apiHost}/users/timeline?limit=${limit}&offset=${offset}`;
