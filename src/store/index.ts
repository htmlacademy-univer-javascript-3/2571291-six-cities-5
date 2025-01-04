import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { reducer } from './reducer';
import createApi from '@/services/api';

export const api = createApi();

const store = configureStore({
  reducer: combineReducers({ reducer }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: { extraArgument: api } }),
});

export { store };
