import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Favorites, Login, Main, NotFound, Offer, PrivateRoute } from '@/pages';
import { Routes } from '@/app';

function App() {
  const router = createBrowserRouter([
    { path: Routes.MAIN, element: <Main /> },
    {
      path: Routes.FAVORITES,
      element: (
        <PrivateRoute>
          <Favorites />
        </PrivateRoute>
      ),
    },
    { path: Routes.LOGIN, element: <Login /> },
    { path: Routes.OFFER, element: <Offer /> },
    { path: '*', element: <NotFound /> },
  ]);

  return <RouterProvider router={router} />;
}

export { App };
