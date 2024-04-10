import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
  name: 'hotels',
  initialState: {
    isLoading: false,
    token: localStorage.getItem('token') || null,
    userId: localStorage.getItem('userId') || null,
  },
  reducers: {
    setIsLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    login: (state, {payload}) => {
      localStorage.setItem('token', payload.token);
      localStorage.setItem('userId', payload.userId);
      return { ...state, ...payload };
    },
    logout: (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      state.token = null;
      state.userId = null;
    },
  },
})


export const { setIsLoading, login, logout } = appSlice.actions

export default appSlice.reducer
