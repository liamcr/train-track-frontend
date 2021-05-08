import { JwtPayload } from "jwt-decode";

export type Comment = {
  _id: string;
  user: string;
  workout: string;
  comment: string;
};

export type Like = {
  _id: string;
  user: string;
  workout: string;
};

export type FollowRelation = {
  follower: string;
  followee: string;
  _id: string;
};

export type LikeRelation = {
  _id: string;
  user: string;
  workout: string;
};

export type Workout = {
  _id: string;
  user: string;
  name: string;
  description?: string;
  liked: boolean;
  date: string;
};

export type Exercise = {
  name: string;
  description: string;
  user: string;
  workout: string;
  index: number;
  sets: ExerciseSet[];
};

export type ExerciseSet = {
  value: number;
  unit: "reps" | "seconds" | "minutes";
  weight: {
    value?: number;
    unit?: "kgs" | "lbs";
  };
};

export type User = {
  displayName: string;
  displayImage: string;
};

export type FullUser = {
  username: string;
  displayImage: string;
  _id: string;
};

export type UserCache = {
  [key: string]: User;
};

export interface ParsedAccessToken extends JwtPayload {
  userId: string;
}
