import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { offersReducer, userReducer } from './reducers';
import createApi from '@/services/api';

export const api = createApi();

const store = configureStore({
  reducer: combineReducers({ offersReducer, userReducer }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: { extraArgument: api } }),
});

export { store };
