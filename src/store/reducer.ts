import { createReducer } from '@reduxjs/toolkit';
import {
  changeCityAction,
  fillOffersAction,
  setFilteredOffersAction,
  setOffersLoadingAction,
} from './actions';
import { CityLocations } from '@/constants';

type InitialStateType = {
  city: OfferCityType;
  offers: OfferType[];
  isOffersLoading: boolean;
  filteredOffers: OfferType[];
};

const initialState: InitialStateType = {
  city: CityLocations.Paris,
  offers: [],
  isOffersLoading: false,
  filteredOffers: [],
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
    });
});

export { reducer };
