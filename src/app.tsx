import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import Main from './pages/main/main';
import Favorites from './pages/favorites/favorites';
import FavoritesEmpty from './pages/favorites-empty/favorites-empty';
import Login from './pages/login/login';
import MainEmpty from './pages/main-empty/main-empty';
import OfferNotLogged from './pages/offer-not-logged/offer-not-logged';
import Offer from './pages/offer/offer';
import NotFound from './pages/not-found/not-found';
import NotImplemented from './pages/not-implemented/not-implemented';
import { useUser } from './providers/user-provider';

export const Routes = {
  MAIN: '/',
  FAVORITES: '/favorites',
  FAVORITES_EMPTY: '/favorites-empty',
  LOGIN: '/login',
  MAIN_EMPTY: '/main-empty',
  OFFER_NOT_LOGGED: '/offer-not-logged',
  OFFER: '/offer',
} as const;

export default function App() {
  const router = createBrowserRouter([
    { path: Routes.MAIN, element: <Main /> },
    {
      path: Routes.FAVORITES,
      Component: () => {
        const { user } = useUser();
        if (user) {
          return <Favorites />;
        }
        return <Navigate to={Routes.LOGIN} />;
      },
    },
    { path: Routes.FAVORITES_EMPTY, element: <FavoritesEmpty /> },
    { path: Routes.LOGIN, element: <Login /> },
    { path: Routes.MAIN_EMPTY, element: <MainEmpty /> },
    { path: Routes.OFFER_NOT_LOGGED, element: <OfferNotLogged /> },
    {
      path: Routes.OFFER,
      children: [
        { path: '', element: <Offer /> },
        { path: ':id', element: <NotImplemented /> },
      ],
    },
    { path: '*', element: <NotFound /> },
  ]);

  return <RouterProvider router={router} />;
}
