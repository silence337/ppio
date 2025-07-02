import axios from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { PortfolioItem } from '../types/Common';

interface WorkResponse {
  Workspace: PortfolioItem[];
}

const initialState: PortfolioItem[] = [];

export const pList = createAsyncThunk<PortfolioItem[]>(
  'GET_HISTORY',
  async () => {
    const response = await axios.get<WorkResponse>('/data/work.json');
    console.log('response.data:', response.data);
    return response.data.Workspace;
  }
);

export const workSlice = createSlice({
  name: 'work',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      pList.fulfilled,
      (state, action: PayloadAction<PortfolioItem[]>) => {
        return [...action.payload];
      }
    );
  },
});

export default workSlice.reducer;
