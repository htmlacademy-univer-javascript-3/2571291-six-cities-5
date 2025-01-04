import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import {
  fillOffersAction,
  setFilteredOffersAction,
  setOffersLoadingAction,
} from './actions';
import { ApiRoutes } from '@/constants';
import { AppDispatch, RootState } from './types';

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
        (offer) => offer.city.name === state.reducer.city.name
      )
    )
  );
});

export { fetchOffersAction };
