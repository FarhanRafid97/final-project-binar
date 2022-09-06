import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserLoading: (state) => {
      state.loading = true;
    },
    setUserData: (state, action) => {
      state.user = action.payload;
      state.error = null;
      state.loading = false;
    },
    setUserEmpty: (state) => {
      state.user = null;
      state.error = null;
      state.loading = false;
    },
    setUserError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setUserLoading, setUserData, setUserEmpty, setUserError } =
  authSlice.actions;

export const authSelector = (state) => state.user;

export default authSlice.reducer;
