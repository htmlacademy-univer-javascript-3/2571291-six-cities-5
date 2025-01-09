import { createAction } from '@reduxjs/toolkit';
import { AuthorizationStatus } from './types';

const changeCityAction = createAction<OfferCityType>('city/changeCity');
const fillOffersAction = createAction<OfferType[]>('city/fillOffers');
const setOffersLoadingAction = createAction<boolean>('city/setOffersLoading');
const setFilteredOffersAction = createAction<OfferType[]>(
  'city/setFilteredOffers'
);
const setAuthorizationStatusAction = createAction<AuthorizationStatus>(
  'user/setAuthorizationStatus'
);
const setUserDataLoadingAction = createAction<boolean>(
  'user/setUserDataLoading'
);
const setUserDataAction = createAction<User | undefined>('user/setUserData');

export {
  changeCityAction,
  fillOffersAction,
  setOffersLoadingAction,
  setFilteredOffersAction,
  setAuthorizationStatusAction,
  setUserDataAction,
  setUserDataLoadingAction,
};
