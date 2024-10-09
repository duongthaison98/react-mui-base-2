import Loadable from 'components/Loadable';
import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

// Inventory
const List = Loadable(lazy(() => import('views/ImportExportWarehouse/index')));
const Import = Loadable(
  lazy(() => import('views/ImportExportWarehouse/Bill/ImportBill'))
);
const Export = Loadable(
  lazy(() => import('views/ImportExportWarehouse/Bill/ExportBill'))
);
const EditOther = Loadable(
  lazy(() => import('views/ImportExportWarehouse/Bill/EditOther'))
);
const EditImex = Loadable(
  lazy(
    () => import('views/ImportExportWarehouse/ImexProducts/EditImexProducts')
  )
);
// const Edit = Loadable(lazy(() => import('views/ImportExportWarehouse/Bill/')));
const OrderSlip = Loadable(lazy(() => import('views/Inventory/OrderSlip')));
const AddOrderSlip = Loadable(
  lazy(() => import('views/Inventory/OrderSlip/AddOrderSlip'))
);
const AddUnderselling = Loadable(
  lazy(() => import('views/Inventory/Underselling/AddUnderselling'))
);

const ImportExport: RouteObject = {
  path: 'inventory',
  element: <Outlet />,
  children: [
    { index: true, element: <List /> },
    {
      path: 'bill',
      element: <Outlet />,
      children: [
        {
          path: 'import',
          element: <Import />,
        },
        {
          path: 'export',
          element: <Export />,
        },
        {
          path: 'edit',
          element: <EditOther />,
        },
      ],
    },
    {
      path: 'imex',
      element: <Outlet />,
      children: [
        {
          path: 'edit',
          element: <EditImex />,
        },
      ],
    },
    {
      path: 'imex/edit',
      children: [{ index: true, element: <EditImex /> }],
    },
    // {
    //   path: 'edit',
    //   children: [{ index: true, element: <Edit /> }],
    // },
    {
      path: 'order-slip',
      children: [
        { index: true, element: <OrderSlip /> },
        { path: 'add', element: <AddOrderSlip /> },
        { path: 'underselling/add', element: <AddUnderselling /> },
      ],
    },
  ],
};

export default ImportExport;
