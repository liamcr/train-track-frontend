type Comment = {
  userId: string;
  comment: string;
  date: string;
};

export type Workout = {
  _id: string;
  user: string;
  name: string;
  description?: string;
  exerciseIds: string[];
  date: string;
  liked: boolean;
  likes: string[];
  comments: Comment[];
};

export type Exercise = {
  name: string;
  description: string;
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
  followers: string[];
  following: string[];
  displayImage: string;
  isFollowing?: boolean;
  _id: string;
};

export type UserCache = {
  [key: string]: User;
};
