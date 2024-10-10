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

export default function App() {
  const router = createBrowserRouter([
    { path: '/', element: <Main /> },
    { path: '/favorites', element: <Favorites /> },
    { path: '/favorites-empty', element: <FavoritesEmpty /> },
    { path: '/login', element: <Login /> },
    { path: '/main-empty', element: <MainEmpty /> },
    { path: '/offer-not-logged', element: <OfferNotLogged /> },
    { path: '/offer', element: <Offer /> },
    { path: '*', element: <Navigate to="/" /> },
  ]);

  return <RouterProvider router={router} />;
}
