import Loadable from '@/components/Loadable';
import DashboardLayout from '@/layouts/Dashboard';
import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';
// Pages
import AccountingRoute from './Accounting';
import Category from './Category';
import Customers from './Customers';
import Inventory from './Inventory';
import Products from './Products';
import Report from './Report';
import Sales from './Sales';
import Warehouse from './Warehouse';
import History from './HistoryAccount';
import HistoryBillion from './HistoryBillion';
import Service from './Service';
import Setting from './Setting';
import Upload from './UploadFile';
import AuthLayout from '@/layouts/Auth/AuthLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import Login from '@/views/Auth/Login';
import Registration from '@/views/Auth/Registration';
import ChangePassword from '@/views/Auth/ChangePassword';
import ForgotPassword from '@/views/Auth/ForgotPassword';
import PublicRoute from '@/components/PublicRoute';

// Home
const Home = Loadable(lazy(() => import('@/views/Home')));

// Test
const Experiment = Loadable(lazy(() => import('@/views/Experiment')));

// Error
const NotFound = Loadable(lazy(() => import('@/views/Errors/NotFound')));

// Auth

const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Home /> },
      {
        path: '/experiment',
        element: <Experiment />,
      },
      Products,
      AccountingRoute,
      Warehouse,
      Report,
      Customers,
      Sales,
      Category,
      Inventory,
      History,
      HistoryBillion,
      Service,
      Setting,
      Upload
    ],
  },
  {
    path: 'auth',
    element: (
      <PublicRoute>
        <AuthLayout />
      </PublicRoute>
    ),
    children: [
      { index: true, element: <Navigate to={'login'} replace /> },
      { path: 'login', element: <Login /> },
      { path: 'registration', element: <Registration /> },
      { path: 'forgot-password', element: <ForgotPassword /> },
      { path: 'change-password', element: <ChangePassword /> },
    ],
  },
  {
    path: '*',
    element: <Outlet />,
    children: [
      { index: true, element: <NotFound /> },
      { path: '*', element: <NotFound /> },
    ],
  },
];

const Routers = () => {
  const element = useRoutes(routes);
  return element;
};

export default Routers;
