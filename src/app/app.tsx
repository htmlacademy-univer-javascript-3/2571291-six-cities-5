import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  Favorites,
  FavoritesEmpty,
  Login,
  Main,
  MainEmpty,
  NotFound,
  Offer,
  OfferNotLogged,
  PrivateRoute,
} from '@/pages';
import { offers } from '@/mocks/offers';
import { Routes } from '@/app';

function App() {
  const router = createBrowserRouter([
    { path: Routes.MAIN, element: <Main /> },
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

export { App };
