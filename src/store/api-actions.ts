import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import {
  fillOffersAction,
  setAuthorizationStatusAction,
  setFilteredOffersAction,
  setOffersLoadingAction,
  setUserDataAction,
  setUserDataLoadingAction,
} from './actions';
import { ApiRoutes } from '@/constants';
import { AppDispatch, AuthorizationStatus, RootState } from './types';
import { dropToken, saveToken } from '@/services/token';

const fetchOffersAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
>('fetch/offers', async (_, { extra: api, dispatch, getState }) => {
  dispatch(setOffersLoadingAction(true));
  const response = await api.get<OfferType[]>(ApiRoutes.Offers);
  dispatch(setOffersLoadingAction(false));
  dispatch(fillOffersAction(response.data));
  const state = getState();
  dispatch(
    setFilteredOffersAction(
      response.data.filter(
        (offer) => offer.city.name === state.offersReducer.city.name
      )
    )
  );
});

const fetchUserAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
>('fetch/login', (_, { extra: api, dispatch }) =>
  api
    .get<User>(ApiRoutes.Login)
    .then((response) => {
      dispatch(setAuthorizationStatusAction(AuthorizationStatus.Authorized));
      dispatch(setUserDataAction(response.data));
    })
    .catch((error) => {
      dispatch(setAuthorizationStatusAction(AuthorizationStatus.Unauthorized));
      dispatch(setUserDataAction(undefined));
      throw error;
    })
    .finally(() => {
      dispatch(setUserDataLoadingAction(false));
    })
);

const loginAction = createAsyncThunk<
  void,
  { email: string; password: string },
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
>('login', ({ email, password }, { extra: api, dispatch }) => {
  dispatch(setUserDataLoadingAction(true));
  return api
    .post<User>(ApiRoutes.Login, { email, password })
    .then((response) => {
      dispatch(setAuthorizationStatusAction(AuthorizationStatus.Authorized));
      dispatch(setUserDataAction(response.data));
      saveToken(response.data.token);
    })
    .catch((error) => {
      dispatch(setAuthorizationStatusAction(AuthorizationStatus.Unauthorized));
      dispatch(setUserDataAction(undefined));
      throw error;
    })
    .finally(() => {
      dispatch(setUserDataLoadingAction(false));
    });
});

const logoutAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
>('logout', (_, { extra: api, dispatch }) => {
  dispatch(setUserDataLoadingAction(true));
  return api
    .delete(ApiRoutes.Logout)
    .then(() => {
      dispatch(setAuthorizationStatusAction(AuthorizationStatus.Unauthorized));
      dispatch(setUserDataAction(undefined));
      dropToken();
    })
    .finally(() => {
      dispatch(setUserDataLoadingAction(false));
    });
});

export { fetchOffersAction, fetchUserAction, loginAction, logoutAction };
