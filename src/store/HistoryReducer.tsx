import axios from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface HistoryWorkItem {
  subj: string;
  text: string[];
}

export interface HistoryItem {
  id: number;
  year: string;
  type: string;
  work: HistoryWorkItem[];
}

const initialState: HistoryItem[] = [];

export const hList = createAsyncThunk<HistoryItem[]>(
  'GET_HISTORY',
  async () => {
    const response = await axios.get<HistoryItem[]>('/data/history.json');
    return response.data;
  }
);

export const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(hList.fulfilled, (state, action: PayloadAction<HistoryItem[]>) => {
      return [...action.payload];
    });
  },
});

export default historySlice.reducer;
