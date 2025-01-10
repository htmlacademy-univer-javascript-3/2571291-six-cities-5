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

const initialOffersState: RootState['offersReducer'] = {
  city: CityLocations.Paris,
  offers: [],
  isOffersLoading: false,
  filteredOffers: [],
};

const initialUserState: RootState['userReducer'] = {
  userData: undefined,
  isUserDataLoading: true,
  authorizationStatus: AuthorizationStatus.Unauthorized,
};

const offersReducer = createReducer(initialOffersState, (builder) => {
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
    });
});

const userReducer = createReducer(initialUserState, (builder) => {
  builder
    .addCase(setAuthorizationStatusAction, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUserDataAction, (state, action) => {
      state.userData = action.payload;
    })
    .addCase(setUserDataLoadingAction, (state, action) => {
      state.isUserDataLoading = action.payload;
    });
});

export { offersReducer, userReducer };
