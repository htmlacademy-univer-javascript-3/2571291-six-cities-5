import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import {
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
import { ApiRoutes } from '@/constants';
import {
  AppDispatch,
  AuthorizationStatus,
  FavoriteStatus,
  RootState,
} from './types';
import { dropToken, saveToken } from '@/services/token';

const fetchOffersAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
>('fetch/offers', async (_, { extra: api, dispatch, getState }) => {
  dispatch(setOffersLoadingAction(true));
  const response = await api.get<OffersType[]>(ApiRoutes.Offers);
  dispatch(setOffersLoadingAction(false));
  dispatch(fillOffersAction(response.data));
  const state = getState();
  dispatch(
    setFilteredOffersAction(
      response.data.filter(
        (offer) => offer.city.name === state.offersReducer.city.name
      )
    )
  );
});

const fetchUserAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
>('fetch/login', (_, { extra: api, dispatch }) =>
  api
    .get<User>(ApiRoutes.Login)
    .then((response) => {
      dispatch(setAuthorizationStatusAction(AuthorizationStatus.Authorized));
      dispatch(setUserDataAction(response.data));
    })
    .catch((error) => {
      dispatch(setAuthorizationStatusAction(AuthorizationStatus.Unauthorized));
      dispatch(setUserDataAction(undefined));
      throw error;
    })
    .finally(() => {
      dispatch(setUserDataLoadingAction(false));
    })
);

const loginAction = createAsyncThunk<
  void,
  { email: string; password: string },
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
>('login', ({ email, password }, { extra: api, dispatch }) => {
  dispatch(setUserDataLoadingAction(true));
  return api
    .post<User>(ApiRoutes.Login, { email, password })
    .then((response) => {
      dispatch(setAuthorizationStatusAction(AuthorizationStatus.Authorized));
      dispatch(setUserDataAction(response.data));
      saveToken(response.data.token);
    })
    .catch((error) => {
      dispatch(setAuthorizationStatusAction(AuthorizationStatus.Unauthorized));
      dispatch(setUserDataAction(undefined));
      throw error;
    })
    .finally(() => {
      dispatch(setUserDataLoadingAction(false));
    });
});

const logoutAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
>('logout', (_, { extra: api, dispatch }) => {
  dispatch(setUserDataLoadingAction(true));
  return api
    .delete(ApiRoutes.Logout)
    .then(() => {
      dispatch(setAuthorizationStatusAction(AuthorizationStatus.Unauthorized));
      dispatch(setUserDataAction(undefined));
      dropToken();
    })
    .finally(() => {
      dispatch(setUserDataLoadingAction(false));
    });
});

const fetchFavoritesAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
>('fetch/favorites', (_, { extra: api, dispatch }) => {
  dispatch(setUserDataLoadingAction(true));
  return api
    .get<OffersType[]>(ApiRoutes.Favorites)
    .then((response) => {
      dispatch(setFavoritesAction(response.data));
    })
    .catch((error) => {
      throw error;
    })
    .finally(() => {
      dispatch(setFavoritesLoadingAction(false));
    });
});

const fetchOfferByIdAction = createAsyncThunk<
  void,
  OffersType['id'],
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
>('fetch/offer', (id, { extra: api, dispatch }) => {
  dispatch(setOfferLoadingAction(true));
  return Promise.all([
    api.get<OfferType>(`${ApiRoutes.Offers}/${id}`),
    api.get<CommentType[]>(`${ApiRoutes.Comments}/${id}`),
  ])
    .then(([offerResponse, commentsResponse]) => {
      dispatch(setOfferAction(offerResponse.data));
      dispatch(setCommentsAction(commentsResponse.data));
    })
    .catch((error) => {
      throw error;
    })
    .finally(() => {
      dispatch(setOfferLoadingAction(false));
    });
});

const changeFavoriteStatusAction = createAsyncThunk<
  void,
  {
    id: OffersType['id'];
    status: FavoriteStatus;
  },
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
>('send/favorites', ({ id, status }, { extra: api, dispatch, getState }) =>
  api
    .post<OfferType>(`${ApiRoutes.Favorites}/${id}/${status}`)
    .then((response) => {
      const favorites = getState().favoritesReducer.favorites;

      dispatch(
        setFavoritesAction(
          status === FavoriteStatus.Favorite
            ? [...favorites, response.data]
            : favorites.filter((offer) => offer.id !== id)
        )
      );

      dispatch(setOfferAction(response.data));

      dispatch(updateOfferFavoriteStatusAction(response.data));
    })
    .catch((error) => {
      throw error;
    })
);

const sendCommentAction = createAsyncThunk<
  void,
  {
    id: OffersType['id'];
    comment: CommentType['comment'];
    rating: CommentType['rating'];
  },
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
>(
  'send/comment',
  ({ id, comment, rating }, { extra: api, dispatch, getState }) =>
    api
      .post<CommentType>(`${ApiRoutes.Comments}/${id}`, { comment, rating })
      .then((response) => {
        dispatch(
          setCommentsAction([
            ...getState().offerReducer.comments,
            response.data,
          ])
        );
      })
      .catch((error) => {
        throw error;
      })
);

export {
  fetchOffersAction,
  fetchUserAction,
  loginAction,
  logoutAction,
  fetchOfferByIdAction,
  fetchFavoritesAction,
  changeFavoriteStatusAction,
  sendCommentAction,
};
