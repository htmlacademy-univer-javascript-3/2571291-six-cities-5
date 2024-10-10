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

export default function App() {
  const router = createBrowserRouter([
    { path: '/', element: <Main /> },
    {
      path: '/favorites',
      Component: () => {
        const { user } = useUser();
        if (user) {
          return <Favorites />;
        }
        return <Navigate to="/login" />;
      },
    },
    { path: '/favorites-empty', element: <FavoritesEmpty /> },
    { path: '/login', element: <Login /> },
    { path: '/main-empty', element: <MainEmpty /> },
    { path: '/offer-not-logged', element: <OfferNotLogged /> },
    {
      path: '/offer',
      children: [
        { path: '', element: <Offer /> },
        { path: ':id', element: <NotImplemented /> },
      ],
    },
    { path: '*', element: <NotFound /> },
  ]);

  return <RouterProvider router={router} />;
}
