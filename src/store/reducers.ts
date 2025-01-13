import { createReducer } from '@reduxjs/toolkit';
import {
  changeCityAction,
  fillOffersAction,
  setAuthorizationStatusAction,
  setCommentsAction,
  setFavoritesAction,
  setFavoritesLoadingAction,
  setFilteredOffersAction,
  setOfferAction,
  setOfferLoadingAction,
  setOffersLoadingAction,
  setUserDataAction,
  setUserDataLoadingAction,
  updateOfferFavoriteStatusAction,
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

const initialFavoritesState: RootState['favoritesReducer'] = {
  favorites: [],
  isFavoritesLoading: true,
};

const initialOfferState: RootState['offerReducer'] = {
  offer: undefined,
  isOfferLoading: false,
  comments: [],
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
    })
    .addCase(updateOfferFavoriteStatusAction, (state, action) => {
      const offerIndex = state.offers.findIndex(
        (x) => x.id === action.payload.id
      );
      if (offerIndex !== -1) {
        state.offers[offerIndex].isFavorite = action.payload.isFavorite;
      }
      const filteredOfferIndex = state.filteredOffers.findIndex(
        (x) => x.id === action.payload.id
      );
      if (filteredOfferIndex !== -1) {
        state.filteredOffers[filteredOfferIndex].isFavorite =
          action.payload.isFavorite;
      }
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

const favoritesReducer = createReducer(initialFavoritesState, (builder) => {
  builder
    .addCase(setFavoritesAction, (state, action) => {
      state.favorites = action.payload;
    })
    .addCase(setFavoritesLoadingAction, (state, action) => {
      state.isFavoritesLoading = action.payload;
    });
});

const offerReducer = createReducer(initialOfferState, (builder) => {
  builder.addCase(setOfferAction, (state, action) => {
    state.offer = action.payload;
  });
  builder.addCase(setOfferLoadingAction, (state, action) => {
    state.isOfferLoading = action.payload;
  });
  builder.addCase(setCommentsAction, (state, action) => {
    state.comments = action.payload;
  });
});

export { offersReducer, userReducer, favoritesReducer, offerReducer };
