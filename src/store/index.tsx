import { configureStore } from '@reduxjs/toolkit';
import workReducer from './WorkReducer';
import historyReducer from './HistoryReducer';

export const store = configureStore({
  reducer: {
    work: workReducer,
    history: historyReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;