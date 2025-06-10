import { configureStore } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';
import workReducer from './WorkReducer';
import historyReducer from './HistoryReducer';

export const history = createBrowserHistory();

const rootReducer = (history) => ({
  // counter: counterReducer,
  // todos: todoReducer,
  work: workReducer,
  history: historyReducer,
  router: history,
});

const preloadedState = {};
export const store = configureStore({
  reducer: rootReducer(history),
  preloadedState,
});

