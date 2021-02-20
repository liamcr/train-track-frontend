import React, { useReducer, createContext, Dispatch } from "react";

type FollowersState = {
  updatedFollowers: number;
};

const initialState: FollowersState = {
  updatedFollowers: 0,
};

const FollowersContext = createContext<{
  state: FollowersState;
  dispatch: Dispatch<{
    type: string;
    initValue?: number;
  }>;
}>({ state: initialState, dispatch: () => null });

const followersReducer = (
  state: FollowersState,
  action: {
    type: string;
    initValue?: number;
  }
) => {
  switch (action.type) {
    case "FOLLOW":
      let followedState = { ...state };

      followedState.updatedFollowers++;

      return {
        ...followedState,
      };
    case "UNFOLLOW":
      let unfollowedState = { ...state };

      unfollowedState.updatedFollowers--;

      return {
        ...unfollowedState,
      };
    case "SET":
      if (action.initValue !== undefined) {
        return {
          updatedFollowers: action.initValue,
        };
      } else {
        return { ...state };
      }
    default:
      return state;
  }
};

const FollowersProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(followersReducer, initialState);

  return (
    <FollowersContext.Provider value={{ state, dispatch }}>
      {children}
    </FollowersContext.Provider>
  );
};

export { FollowersProvider, FollowersContext };
