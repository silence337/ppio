import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const workSlice = createSlice({
  name: 'work',
  initialState: {
    data: [],
  },
  reducers: {
    setDataSuccess: (state, action) => {
      state.data = action.payload.data;
    },
  },
});
export default workSlice.reducer;

const { setDataSuccess } = workSlice.actions;
export const setData =
  ({ data }) =>
  async (dispatch) => {
    try {
      //console.log(data);
      dispatch(setDataSuccess({ data }));
    } catch (e) {
      return console.error(e.message);
    }
  };
