import { createReducer } from '@reduxjs/toolkit';
import {
  changeCityAction,
  fillOffersAction,
  setAuthorizationStatusAction,
  setFilteredOffersAction,
  setOffersLoadingAction,
  setUserDataAction,
  setUserDataLoadingAction,
} from './actions';
import { CityLocations } from '@/constants';
import { AuthorizationStatus, RootState } from './types';

const initialState: RootState['reducer'] = {
  city: CityLocations.Paris,
  offers: [],
  isOffersLoading: false,
  filteredOffers: [],
  authorizationStatus: AuthorizationStatus.Unauthorized,
  userData: undefined,
  userDataLoading: true,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCityAction, (state, action) => {
      state.city = action.payload;
    })
    .addCase(fillOffersAction, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setOffersLoadingAction, (state, action) => {
      state.isOffersLoading = action.payload;
    })
    .addCase(setFilteredOffersAction, (state, action) => {
      state.filteredOffers = action.payload;
    })
    .addCase(setAuthorizationStatusAction, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUserDataAction, (state, action) => {
      state.userData = action.payload;
    })
    .addCase(setUserDataLoadingAction, (state, action) => {
      state.userDataLoading = action.payload;
    });
});

export { reducer };
