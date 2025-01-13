import type { store } from './';

// export type RootState = ReturnType<typeof store.getState>; - этот код не работает, так как store - это функция, а не объект по неизвестной причине
export type RootState = {
  offersReducer: {
    city: OfferCityType;
    offers: OffersType[];
    isOffersLoading: boolean;
    filteredOffers: OffersType[];
  };
  userReducer: {
    userData: User | undefined;
    isUserDataLoading: boolean;
    authorizationStatus: AuthorizationStatus;
  };
  offerReducer: {
    offer: OfferType | undefined;
    isOfferLoading: boolean;
    comments: CommentType[];
  };
  favoritesReducer: {
    favorites: OffersType[];
    isFavoritesLoading: boolean;
  };
};

export type AppDispatch = typeof store.dispatch;

export enum AuthorizationStatus {
  Authorized = 'AUTHORIZED',
  Unauthorized = 'UNAUTHORIZED',
}

export enum FavoriteStatus {
  NotFavorite,
  Favorite,
}
