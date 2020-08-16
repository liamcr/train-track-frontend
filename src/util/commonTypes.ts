import { type } from "os";

type Comment = {
  userId: string;
  comment: string;
  date: Date;
};

export type Workout = {
  user: string;
  name: string;
  description?: string;
  exerciseIds: [string];
  date: Date;
  likes: [string];
  comments: [Comment];
};

export type User = {
  displayName: string;
};

export type UserCache = {
  [key: string]: User;
};
