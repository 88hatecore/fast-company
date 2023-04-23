import { createSlice } from "@reduxjs/toolkit";
import userService from "../../services/user.service";
import isOutDated from "../utils/isOutDated";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null
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
    }
  }
});

const { reducer: usersReducer, actions } = usersSlice;
const { usersRequested, usersRecived, usersRequestFailed } = actions;

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
