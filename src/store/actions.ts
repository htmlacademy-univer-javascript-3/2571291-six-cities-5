import { createAction } from '@reduxjs/toolkit';

const changeCityAction = createAction<OfferCityType>('city/changeCity');
const fillOffersAction = createAction<OfferType[]>('city/fillOffers');
const setOffersLoadingAction = createAction<boolean>('city/setOffersLoading');
const setFilteredOffersAction = createAction<OfferType[]>(
  'city/setFilteredOffers'
);

export {
  changeCityAction,
  fillOffersAction,
  setOffersLoadingAction,
  setFilteredOffersAction,
};
