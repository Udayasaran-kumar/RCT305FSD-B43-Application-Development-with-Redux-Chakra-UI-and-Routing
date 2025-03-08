import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  loading: false,
};

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    fetchUsersStart: (state) => {
      state.loading = true;
    },
    fetchUsersSuccess: (state, action) => {
      state.users = action.payload;
      state.loading = false;
    },
  },
});

export const { fetchUsersStart, fetchUsersSuccess } = userSlice.actions;

export const fetchUsers = () => async (dispatch) => {
  dispatch(fetchUsersStart());
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await response.json();
  dispatch(fetchUsersSuccess(data));
};

export default userSlice.reducer;