import Loadable from '@/components/Loadable';
import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

const Upload = Loadable(lazy(() => import('@/views/UploadFile/index')));

const UploadPage: RouteObject = {
  path: 'upload',
  element: <Outlet />,
  children: [{ index: true, element: <Upload /> }],
};

export default UploadPage;
