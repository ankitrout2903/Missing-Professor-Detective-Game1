import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import LoginPage from './pages/LoginPage';
import SignupForm from './pages/SignupPage';
import UserPage from './pages/UserPage';

import Page404 from './pages/Page404';
import DashboardAppPage from './pages/DashboardAppPage';
import GamePage from './pages/GamePage';
import Pregame from './pages/Pregame';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/',
      element: <SimpleLayout />,
      children: [
        { element: <LoginPage />, index: true },
        { path: '404', element: <Page404 /> },
        { path: 'signup', element: <SignupForm /> },
        { path: 'pregame', element: <Pregame /> },
        { path: 'game', element: <GamePage /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
      ],
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
