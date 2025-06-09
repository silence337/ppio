import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const hList = createAsyncThunk('GET_HISTORY', async () => {
  return axios
    .get('/data/history.json')
    .then((res) => res.data)
    .catch((error) => error);
});

export const historySlice = createSlice({
  name: 'history',
  initialState: [],
  reducers: {},
  // extraReducers: {
  //   [hList.fulfilled]: (state, { payload }) => [...payload],
  // },
  extraReducers: (builder) => {
    builder.addCase(hList.fulfilled, (state, { payload }) => {
      return [...payload]
    })
  }
});


export default historySlice.reducer;
