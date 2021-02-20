import React, { useReducer, createContext, Dispatch } from "react";
import { UserCache } from "./commonTypes";

const initialState: UserCache = {};

const CacheContext = createContext<{
  state: UserCache;
  dispatch: Dispatch<{
    type: string;
    payload: { userId: string; displayName: string; displayImage: string };
  }>;
}>({ state: initialState, dispatch: () => null });

const userReducer = (
  state: UserCache,
  action: {
    type: string;
    payload: { userId: string; displayName: string; displayImage: string };
  }
) => {
  switch (action.type) {
    case "ADD_USER":
      return {
        ...state,
        [action.payload.userId]: {
          displayName: action.payload.displayName,
          displayImage: action.payload.displayImage,
        },
      };
    default:
      return state;
  }
};

const TimelineProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <CacheContext.Provider value={{ state, dispatch }}>
      {children}
    </CacheContext.Provider>
  );
};

export { TimelineProvider, CacheContext };
