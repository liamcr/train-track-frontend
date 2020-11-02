type Comment = {
  userId: string;
  comment: string;
  date: string;
};

export type Workout = {
  user: string;
  name: string;
  description?: string;
  exerciseIds: [string];
  date: string;
  likes: [string];
  comments: [Comment];
};

export type Exercise = {
  name: string;
  description: string;
  sets: [ExerciseSet];
};

export type ExerciseSet = {
  value: number;
  unit: "reps" | "seconds" | "minutes";
  weight: {
    value: number;
    unit: "kgs" | "lbs";
  };
};

export type User = {
  displayName: string;
};

export type UserCache = {
  [key: string]: User;
};
