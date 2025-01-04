import { offers } from '@/mocks/offers';
import { createReducer } from '@reduxjs/toolkit';
import { changeCityAction, fillOffersAction } from './actions';
import { CityLocations } from '@/constants';
import type { CityLocation } from '@/types';

type InitialStateType = {
  city: CityLocation;
  offers: typeof offers;
};

const initialState: InitialStateType = {
  city: CityLocations.Paris,
  offers: offers.filter((o) => o.city === 'Paris'),
};

const cityReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCityAction, (state, action) => {
      state.city = action.payload;
    })
    .addCase(fillOffersAction, (state, action) => {
      state.offers = action.payload;
    });
});

export { cityReducer };
