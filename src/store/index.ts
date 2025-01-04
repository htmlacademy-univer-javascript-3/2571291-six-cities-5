import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { cityReducer } from './reducer';

const store = configureStore({
  reducer: combineReducers({ cityReducer }),
});

export { store };
