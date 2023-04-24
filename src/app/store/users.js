import { createAction, createSlice } from "@reduxjs/toolkit";
import userService from "../../services/user.service";
import isOutDated from "../utils/isOutDated";
import authService from "../../services/auth.service";
import localStorageService from "../../services/localStorage.service";
import getRandomInt from "../utils/getRandomInt";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null,
    auth: null,
    isLoggedIn: false
  },
  reducers: {
    usersRequested: (state) => {
      state.isLoading = true;
    },
    usersRecived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    usersRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    authRequestSuccess: (state, action) => {
      state.auth = { ...action.payload, isLoggedIn: true };
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload;
    },
    userCreated: (state, action) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.push(action.payload);
    }
  }
});

const { reducer: usersReducer, actions } = usersSlice;
const {
  usersRequested,
  usersRecived,
  usersRequestFailed,
  authRequestSuccess,
  authRequestFailed,
  userCreated
} = actions;
const authRequested = createAction("users/authRequested");
const userCreateRequested = createAction("users/userCreateRequested");
const createUserFailed = createAction("users/createUserFailed");
export const signUp =
  ({ email, password, ...rest }) =>
  async (dispatch) => {
    dispatch(authRequested());
    try {
      const data = await authService.register({ email, password });
      localStorageService.setTokens(data);
      dispatch(authRequestSuccess({ userId: data.localId }));
      dispatch(
        createUser({
          _id: data.localId,
          email,
          rate: getRandomInt(1, 5),
          completedMeetings: getRandomInt(0, 200),
          img: `https://avatars.dicebear.com/api/adventurer/${(
            Math.random() + 1
          )
            .toString(36)
            .substring(7)}.svg`,
          ...rest
        })
      );
    } catch (error) {
      dispatch(authRequestFailed(error.message));
    }
  };

function createUser(payload) {
  return async function (dispatch) {
    dispatch(userCreateRequested());
    try {
      const { content } = await userService.create(payload);
      dispatch(userCreated(content));
    } catch (error) {
      dispatch(createUserFailed(error.message));
    }
  };
}

export const loadUsersList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().users;
  if (isOutDated(lastFetch)) {
    dispatch(usersRequested());
    try {
      const { content } = await userService.get();
      dispatch(usersRecived(content));
    } catch (error) {
      dispatch(usersRequestFailed(error.message));
    }
  }
};

export const getUsersList = () => (state) => {
  return state.users.entities;
};

export const getUsersById = (userId) => (state) => {
  if (state.users.entities) {
    return state.users.entities.find((u) => u._id === userId);
  }
};

export default usersReducer;
