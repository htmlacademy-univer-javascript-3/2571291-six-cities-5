import type { store } from './';

// export type RootState = ReturnType<typeof store.getState>; - этот код не работает, так как store - это функция, а не объект по неизвестной причине
export type RootState = {
  offersReducer: {
    city: OfferCityType;
    offers: OfferType[];
    isOffersLoading: boolean;
    filteredOffers: OfferType[];
  };
  userReducer: {
    userData: User | undefined;
    isUserDataLoading: boolean;
    authorizationStatus: AuthorizationStatus;
  };
};

export type AppDispatch = typeof store.dispatch;

export enum AuthorizationStatus {
  Authorized = 'AUTHORIZED',
  Unauthorized = 'UNAUTHORIZED',
}
