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
