import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import Main from './main/page';
import Favorites from './favorites/page';
import FavoritesEmpty from './favorites-empty/page';
import Login from './login/page';
import MainEmpty from './main-empty/page';
import OfferNotLogged from './offer-not-logged/page';
import Offer from './offer/page';

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
