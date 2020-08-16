import { createContext } from "react";
import { User, UserCache } from "./commonTypes";

export const TimelineUserCacheContext = createContext<{
  userCache: UserCache;
  addUser: (userId: string, user: User) => void;
}>({
  userCache: {},
  addUser: (userId: string, user: User) => {
    console.log({ userId, user });
  },
});
