import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from './pages/main/main';
import Favorites from './pages/favorites/favorites';
import FavoritesEmpty from './pages/favorites-empty/favorites-empty';
import Login from './pages/login/login';
import MainEmpty from './pages/main-empty/main-empty';
import OfferNotLogged from './pages/offer-not-logged/offer-not-logged';
import Offer from './pages/offer/offer';
import NotFound from './pages/not-found/not-found';
import PrivateRoute from './pages/private-route/private-route';
import { offers } from './mocks/offers';

export const Routes = {
  MAIN: '/',
  FAVORITES: '/favorites',
  FAVORITES_EMPTY: '/favorites-empty',
  LOGIN: '/login',
  MAIN_EMPTY: '/main-empty',
  OFFER_NOT_LOGGED: '/offer-not-logged',
  OFFER: '/offer/:id',
} as const;

export default function App() {
  const router = createBrowserRouter([
    { path: Routes.MAIN, element: <Main offers={offers} /> },
    {
      path: Routes.FAVORITES,
      element: (
        <PrivateRoute isAuthenticated>
          <Favorites offers={offers.filter((x) => x.isFavorite)} />
        </PrivateRoute>
      ),
    },
    { path: Routes.FAVORITES_EMPTY, element: <FavoritesEmpty /> },
    { path: Routes.LOGIN, element: <Login /> },
    { path: Routes.MAIN_EMPTY, element: <MainEmpty /> },
    { path: Routes.OFFER_NOT_LOGGED, element: <OfferNotLogged /> },
    { path: Routes.OFFER, element: <Offer /> },
    { path: '*', element: <NotFound /> },
  ]);

  return <RouterProvider router={router} />;
}
