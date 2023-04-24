import { createAction, createSlice } from "@reduxjs/toolkit";
import userService from "../../services/user.service";
import isOutDated from "../utils/isOutDated";
import authService from "../../services/auth.service";
import localStorageService from "../../services/localStorage.service";

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
    }
  }
});

const { reducer: usersReducer, actions } = usersSlice;
const {
  usersRequested,
  usersRecived,
  usersRequestFailed,
  authRequestSuccess,
  authRequestFailed
} = actions;
const authRequested = createAction("users/");
export const signUp =
  ({ email, password, ...rest }) =>
  async (dispatch) => {
    dispatch(authRequested());
    try {
      const data = await authService.register({ email, password });
      localStorageService.setTokens(data);
      dispatch(authRequestSuccess({ userId: data.localId }));
    } catch (error) {
      dispatch(authRequestFailed(error.message));
    }
  };

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
