import { configureStore } from '@reduxjs/toolkit';
import workReducer from './WorkSlice';
import historyReducer from './HistorySlice';

export const store = configureStore({
  reducer: {
    work: workReducer,
    history: historyReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
