const Routes = {
  MAIN: '/',
  FAVORITES: '/favorites',
  FAVORITES_EMPTY: '/favorites-empty',
  LOGIN: '/login',
  MAIN_EMPTY: '/main-empty',
  OFFER_NOT_LOGGED: '/offer-not-logged',
  OFFER: '/offer/:id',
} as const;

export { Routes };
