import Loadable from 'components/Loadable';
import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

// Sales
const Retail = Loadable(lazy(() => import('views/Sale/Retail')));
const EditRetail = Loadable(lazy(() => import('views/Sale/Retail/CRUD/Edit')));
const CreateRetail = Loadable(
  lazy(() => import('views/Sale/Retail/CRUD/Create'))
);
const OrderTransport = Loadable(
  lazy(() => import('views/Sale/OrderTransport'))
);
const Return = Loadable(lazy(() => import('views/Sale/Return')));
const CreateReturn = Loadable(
  lazy(() => import('views/Sale/Return/CRUD/Create'))
);
const EditReturn = Loadable(lazy(() => import('views/Sale/Return/CRUD/Edit')));
const DetailRetail = Loadable(
  lazy(() => import('views/Sale/Retail/CRUD/Detail'))
);
const Sales: RouteObject = {
  path: 'sales',
  element: <Outlet />,
  children: [
    { index: true, element: <div>Sales</div> },
    {
      path: 'retail',
      element: <Retail />,
    },
    {
      path: 'retail/edit/:id',
      element: <EditRetail />,
    },
    {
      path: 'retail/create',
      element: <CreateRetail />,
    },
    { path: 'retail/detail/:id', element: <DetailRetail /> },
    { path: 'order-transport', element: <OrderTransport /> },
    { path: 'return', element: <Return /> },
    { path: 'return/create', element: <CreateReturn /> },
    { path: 'return/edit/:id', element: <EditReturn /> },
  ],
};

export default Sales;
