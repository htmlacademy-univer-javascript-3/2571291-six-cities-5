import { createAction } from '@reduxjs/toolkit';
import { AuthorizationStatus } from './types';

const changeCityAction = createAction<OfferCityType>('offers/changeCity');
const fillOffersAction = createAction<OffersType[]>('offers/fillOffers');
const setOffersLoadingAction = createAction<boolean>('offers/setOffersLoading');
const setFilteredOffersAction = createAction<OffersType[]>(
  'offers/setFilteredOffers'
);
const updateOfferFavoriteStatusAction = createAction<{
  id: OfferType['id'];
  isFavorite: OfferType['isFavorite'];
}>('offers/updateOfferFavoriteStatus');

const setAuthorizationStatusAction = createAction<AuthorizationStatus>(
  'user/setAuthorizationStatus'
);
const setUserDataLoadingAction = createAction<boolean>(
  'user/setUserDataLoading'
);
const setUserDataAction = createAction<User | undefined>('user/setUserData');

const setOfferAction = createAction<OfferType | undefined>('offer/setOffer');
const setOfferLoadingAction = createAction<boolean>('offer/setOfferLoading');
const setCommentsAction = createAction<CommentType[]>('offer/setComments');

const setFavoritesAction = createAction<OffersType[]>('favorites/setFavorites');
const setFavoritesLoadingAction = createAction<boolean>(
  'favorites/setFavoritesLoading'
);

export {
  changeCityAction,
  fillOffersAction,
  setOffersLoadingAction,
  setFilteredOffersAction,
  setAuthorizationStatusAction,
  setUserDataAction,
  setUserDataLoadingAction,
  setOfferAction,
  setOfferLoadingAction,
  setCommentsAction,
  setFavoritesAction,
  setFavoritesLoadingAction,
  updateOfferFavoriteStatusAction,
};
